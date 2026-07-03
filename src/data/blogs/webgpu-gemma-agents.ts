import { BlogPost } from "../blogs";

export const webgpuGemmaAgentsBlog: BlogPost = {
  slug: "webgpu-gemma-agents",
  title: "Building On-Device Gemma Agents with LiteRT-LM and WebGPU",
  excerpt:
    "Running LLMs in the cloud is expensive, latency-prone, and fragile. Learn how to build offline, zero-cost, and private AI agents that run directly in the browser using the Google AI Edge stack and WebGPU.",
  date: "July 4, 2026",
  readTime: "5 min read",
  category: "Artificial Intelligence",
  tags: ["WebGPU", "LiteRT", "Gemma", "Agents", "On-Device AI"],
  gradientClass:
    "from-blue-600/20 via-indigo-600/10 to-purple-600/20 border-indigo-500/20",
  content: [
    {
      type: "paragraph",
      text: "There is a fundamental problem with how we build AI applications today. Every time a user types a prompt, a payload travels across the internet, hits a server, queues up on a massive GPU cluster, and streams back token by token. It is expensive. It is latency-prone. And if the user loses their connection, the entire experience breaks.",
    },
    {
      type: "paragraph",
      text: "We have all accepted this as the cost of doing business with Large Language Models. But what if you could just download the model and run it directly in the browser? No backend API. No cloud inference bills. No latency.",
    },
    {
      type: "paragraph",
      text: "This is exactly what the new Google AI Edge stack allows us to do.",
    },
    {
      type: "heading",
      level: 2,
      text: "The Reality of On-Device LLMs",
    },
    {
      type: "paragraph",
      text: "On-device AI is not entirely new. It has been with us for quite some time, but it was mostly limited to basic computer vision tasks.",
    },
    {
      type: "paragraph",
      text: "Then we got local LLMs. But let us be honest, they were not that great or feasible to run. If you wanted to run a model locally, you had to ask your users to install a heavy runtime, dedicate massive amounts of RAM, and listen to their laptop fans sound like a jet engine taking off. Size did not equal quality; it just equaled friction.",
    },
    {
      type: "paragraph",
      text: 'That trajectory is changing rapidly. With the release of models like **Gemma 4**, we are seeing a massive shift. The "E" in models like **Gemma 4 E2B** stands for effective. By targeting specific tasks, these compact models offer incredibly low latency and minimized hardware requirements without sacrificing quality. The E2B model comes in at just 1.9GB, yet it delivers frontier-class accuracy on standardized benchmarks.',
    },
    {
      type: "quote",
      text: "Small models now mean frontier performance.",
    },
    {
      type: "image",
      url: "/blogs/on-device-edge-gemma-agents/image-1.png",
      alt: "Benchmark comparison showing Gemma 4 E4B and E2B vs Gemma 3 27B",
      caption: "Benchmark trajectory of local LLM capabilities: compact models delivering frontier accuracy at a fraction of the size.",
    },
    {
      type: "heading",
      level: 2,
      text: "Why Edge AI Changes the Game",
    },
    {
      type: "paragraph",
      text: "Moving inference to the edge solves four of the biggest headaches in AI development today.",
    },
    {
      type: "list",
      items: [
        "**Zero Cloud Costs**: You completely eliminate expensive server fees. Your operational overhead drops to the cost of standard static web hosting.",
        "**100% Offline**: Critical workflows remain active and reliably performant even under complete network disconnects.",
        "**Zero Latency**: You gain instantaneous inference times by removing round-trip network hops entirely.",
        "**Absolute Privacy**: You ensure total protection of private user data by processing all information locally on the user's device.",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "The Google AI Edge Stack",
    },
    {
      type: "paragraph",
      text: "To make this work in a web browser, we need the right infrastructure. Google AI Edge provides a cross-platform framework that includes **LiteRT** and **LiteRT-LM**.",
    },
    {
      type: "paragraph",
      text: "LiteRT-LM is specifically optimized for large language models. When combined with WebGPU, it allows the browser to utilize the user's local graphics hardware to run tensor operations natively. The best part? It is incredibly easy to set up.",
    },
    {
      type: "heading",
      level: 2,
      text: "Zero to Inference in 15 Lines",
    },
    {
      type: "paragraph",
      text: "Integrating this into a web app does not require a complex Python backend or containerized deployment. It is just TypeScript running in the client. First, you install the core library package.",
    },
    {
      type: "code",
      language: "bash",
      code: "npm install @litert-lm/core",
    },
    {
      type: "paragraph",
      text: "Then, you load the model and initialize the engine. Here is what the entire pipeline looks like from fetch to inference.",
    },
    {
      type: "code",
      language: "typescript",
      code: `import { Engine } from "@litert-lm/core";

// 1. Fetch the Gemma 4 E2B model 
const modelUrl = "https://huggingface.co/litert-community/gemma-4-E2B-it-litert-lm/resolve/main/gemma-4-E2B-it-web.litertlm";
const response = await fetch(modelUrl);

// 2. Stream directly into the WebGPU Engine
const engine = await Engine.create({ 
  model: response.body 
});

// 3. Initialize the conversation with a system prompt
const chat = await engine.createConversation({
  preface: { 
    messages: [{ 
      role: "system", 
      content: "You are a helpful AI assistant." 
    }] 
  },
});

// 4. Generate text locally
const reply = await chat.sendMessage({ 
  role: "user", 
  content: "Why is On-Device AI important?" 
});

console.log(reply.content[0].text);`,
    },
    {
      type: "paragraph",
      text: "That is it. The browser fetches the weights, loads them into the GPU, and starts generating text.",
    },
    {
      type: "paragraph",
      text: "For a real production application, you do not want the user to download a 2GB file every time they refresh the page. In my implementation, I use the File System Access API and IndexedDB (idb-keyval) to save the model directly to the user's local disk after the first download. Subsequent visits load instantly.",
    },
    {
      type: "heading",
      level: 2,
      text: "Breaking the Sandbox (Adding Web Search)",
    },
    {
      type: "paragraph",
      text: "Local LLMs are incredible, but out of the box, they are completely offline and frozen in time. If a user asks for today's weather or the latest stock price, a purely offline model will fail.",
    },
    {
      type: "paragraph",
      text: "To bridge this gap, we can give the local model internet access using an orchestration loop and a search API like Tavily.",
    },
    {
      type: "paragraph",
      text: 'Instead of treating the model as a simple text generator, we treat it as a reasoning agent. We prompt Gemma to decide when web search is needed. If it needs real-time data, it outputs a specific tag, like [SEARCH: "latest news on AI"].',
    },
    {
      type: "paragraph",
      text: "The client application detects this intent, intercepts the message, and queries the Web Search API.",
    },
    {
      type: "code",
      language: "typescript",
      code: `// 1. Check if the local model is requesting outside data
if (aiText.includes("[SEARCH:")) {
  // Extract the query string from the tag
  const query = extractSearchQuery(aiText);
  
  // 2. Fetch live data from a Search API (e.g., Tavily)
  const searchResults = await executeWebSearch(query);
  
  // 3. Inject the live context back into the local WebGPU engine
  const prompt = \`The user asked: "\${userPrompt}". 
                  Web search results: \${searchResults}. 
                  Answer directly using this data.\`;
                  
  const finalResponse = await conversation.sendMessage({
    role: "user",
    content: prompt,
  });
  
  aiText = finalResponse.content[0].text;
}`,
    },
    {
      type: "paragraph",
      text: "The live search results are injected as a source of truth, and the WebGPU engine answers locally with updated live knowledge.",
    },
    {
      type: "paragraph",
      text: "We essentially give an offline model the power of the live internet, with all the orchestration logic handled entirely on the client side.",
    },
    {
      type: "video",
      url: "/blogs/on-device-edge-gemma-agents/videos-2.mov",
      caption: "Demonstration of edge.sugatobagchi.com executing local WebGPU inference with live search orchestration.",
    },
    {
      type: "heading",
      level: 2,
      text: "What this means for the Future",
    },
    {
      type: "paragraph",
      text: "This architecture completely changes how we think about building AI products. For developers, it means we can build sophisticated, agentic workflows without worrying about scaling server costs. For enterprise companies, it means you can deploy powerful AI tools internally without ever sending sensitive corporate data over a network connection.",
    },
    {
      type: "paragraph",
      text: "The web is evolving into a platform capable of running frontier AI locally.",
    },
    {
      type: "paragraph",
      text: "If you want to see this orchestration in action, test out the live demo at [edge.sugatobagchi.com](https://edge.sugatobagchi.com) (works only in PC). You can inspect the network tab and see that once the model is cached, the inference happens entirely on your machine.",
    },
    {
      type: "paragraph",
      text: "Feel free to connect with me across my socials if you want to talk or just connect!",
    },
    {
      type: "interactive",
      widget: "socials",
    },
  ],
  githubUrl: "https://github.com/sugatobagchi/gemma-agents-webgpu",
  liveUrl: "https://edge.sugatobagchi.com/",
  slidesUrl: "https://docs.google.com/presentation/d/e/2PACX-1vQlV1-8_ba3Sk5ic8BxhmIf8KQoy_hR0k1gVAGHG3n-ivjon2HHa2-UZwI0TvagrivuDWgiCZlE-mLQ/pub",
  resources: [
    {
      label: "AI Edge",
      url: "https://developers.google.com/edge",
      iconName: "Globe",
    },
    {
      label: "AI Edge Gallery",
      url: "https://developers.google.com/edge/gallery",
      iconName: "LayoutGrid",
    },
    {
      label: "LiteRT",
      url: "https://developers.google.com/edge/litert",
      iconName: "Cpu",
    },
    {
      label: "LiteRT-LM Docs",
      url: "https://developers.google.com/edge/litert-lm/overview",
      iconName: "FileText",
    },
    {
      label: "LiteRT-LM GitHub",
      url: "https://github.com/google-ai-edge/LiteRT-LM",
      iconName: "Github",
    },
    {
      label: "MediaPipe",
      url: "https://developers.google.com/edge/mediapipe/solutions/guide",
      iconName: "Sparkles",
    },
    {
      label: "Gemma 4",
      url: "https://deepmind.google/models/gemma/gemma-4/",
      iconName: "Bot",
    },
    {
      label: "AI Studio",
      url: "https://aistudio.google.com/",
      iconName: "ExternalLink",
    },
  ],
};
