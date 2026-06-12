import { BlogPost } from "../blogs";

export const a2uiBlog: BlogPost = {
  slug: "a2ui-portfolio-demo",
  title:
    "When Your Agent Stops Talking and Starts Showing (Exploring Google's A2UI)",
  excerpt:
    "Agents have been stuck returning text since the beginning. A2UI changes that. Here is how I built a declarative UI agent directly into this portfolio, and why the same pattern works for enterprise too.",
  date: "June 13, 2026",
  readTime: "7 min read",
  category: "Artificial Intelligence",
  tags: ["A2UI", "Agents", "Gemini", "Vertex AI", "Next.js"],
  gradientClass:
    "from-emerald-600/20 via-teal-600/10 to-cyan-600/20 border-emerald-500/20",
  content: [
    {
      type: "paragraph",
      text: "There is a conversation every developer building conversational agents has had. A user asks something that would be answered in two seconds with a dropdown or a map. Instead, the agent returns a wall of text. The user squints, copies a date, pastes it back, and the agent asks a follow-up anyway. This is not a model quality problem. The model understood the question perfectly. It is a medium problem. Agents have been locked into returning strings since the day they were invented.",
    },
    {
      type: "paragraph",
      text: "A2UI changes that. And this very page is running a live implementation of it.",
    },
    {
      type: "heading",
      level: 2,
      text: "The Problem Is the Medium, Not the Model",
    },
    {
      type: "paragraph",
      text: "Most agent frameworks, regardless of how good the underlying model is, treat the response surface as a text terminal. The agent can reason, plan, use tools, call APIs. But at the boundary where it meets the user, all of that collapses into a string.",
    },
    {
      type: "paragraph",
      text: "That is fine for question-answer tasks. It breaks down fast for everything else. Multi-turn slot filling wastes turns and patience. Choices among options become bulleted lists the user has to re-read and type back. Spatial information gets reduced to addresses. Timelines get collapsed into paragraphs. The agent knows the structure of the data. It just has no way to transmit that structure to the interface.",
    },
    {
      type: "paragraph",
      text: "The patches people reach for make things worse. Sending HTML or JavaScript fragments introduces cross-site scripting risk, visual drift from your design system, and UI injection from a remote agent you do not fully control. What is actually needed is a way to transmit UI that is as safe as data and as expressive as code. We want a protocol that behaves like a structured data channel.",
    },
    {
      type: "heading",
      level: 2,
      text: "What A2UI is?",
    },
    {
      type: "paragraph",
      text: "A2UI is an open protocol, introduced by Google and co-developed with the Flutter team and product teams behind Gemini Enterprise. Instead of returning text or HTML, an agent returns a JSON payload that describes a UI. That payload is a tree of components paired with a data model holding the values those components display.",
    },
    {
      type: "paragraph",
      text: "Three properties make this useful in practice. First, it is declarative, not executable. The payload is data. The client only renders components from a pre-approved catalog, so a remote agent cannot inject arbitrary code or steal credentials through a UI widget. Second, it is streaming-friendly. The format is a flat list of small JSON messages, so the model can emit them incrementally and the client can paint as they arrive. Third, it is framework-agnostic. The same agent response can render through React, Lit, Angular, Flutter, or native mobile. The agent does not know or care what is on the other end.",
    },
    {
      type: "quote",
      text: "The agent knows the structure of the data. A2UI gives it a way to transmit that structure to the interface, safely and incrementally, without caring what framework is rendering it.",
    },
    {
      type: "heading",
      level: 2,
      text: "Where A2UI is handy?",
    },
    {
      type: "paragraph",
      text: "The confusion about A2UI usually comes from conflating four distinct layers that are each doing a different job. The app experience layer (the chat window, input box, message history) is owned by whatever shell you are using. The rendering layer turns component descriptions into actual pixels. The conversation pipeline handles client-to-server transport. And A2UI is the cargo, the structured thing flowing through that pipeline that describes the UI.",
    },
    {
      type: "paragraph",
      text: "That separation is why the same A2UI payload can render in completely different deployment shapes. A bespoke web app with a custom renderer. A CopilotKit or AG-UI shell with an A2UI renderer registered inside it. Or Gemini Enterprise, where GE is the shell, the renderer, and the transport. You only build the agent. The protocol is the constant. Everything else is swappable.",
    },
    {
      type: "heading",
      level: 2,
      text: "How I Built It Into This Portfolio",
    },
    {
      type: "paragraph",
      text: "The implementation here is intentionally minimal but fully representative of how A2UI works in production. There are three moving parts. A component catalog, a system instruction that tells the model which component to use and when, and a client that renders whatever component name arrives in the JSON.",
    },
    {
      type: "paragraph",
      text: "The catalog is a registry of named React components. Timeline, SkillGrid, LocationMap, and VolunteerList. Each component knows how to render a specific kind of structured data. The agent never sees any React code. It only sees a list of component names and the prop shapes each one accepts, embedded directly in the system instruction.",
    },
    {
      type: "paragraph",
      text: "When a message arrives, the agent decides whether a UI widget is the right answer. If it is, it emits a JSON response with a component name and props object rather than prose. If text is more appropriate, it falls back to text. Both can coexist in the same response, and in this implementation, they always do. The agent sends a short message alongside every component.",
    },
    {
      type: "paragraph",
      text: "On the client, the widget reads the component name from the JSON, looks it up in the catalog, and renders it. There is no eval, no innerHTML, no dynamic imports. The surface area for injection is exactly zero.",
    },
    {
      type: "interactive",
      widget: "chat-prompts",
      items: [
        "Show me your career timeline",
        "What's your tech stack?",
        "Where are you based?",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "How easy is implementing A2UI?",
    },
    {
      type: "paragraph",
      text: "Integrating the protocol starts with two main tasks. You write your UI components, and then you teach the model to return structured data matching those components.",
    },
    {
      type: "paragraph",
      text: "First, install the library package.",
    },
    {
      type: "code",
      language: "bash",
      code: "npm install @google/a2ui-express",
    },
    {
      type: "paragraph",
      text: "On the server, you define a component contract. This tells the application what properties a widget accepts. Here is an example configuration for a simple weather widget.",
    },
    {
      type: "code",
      language: "typescript",
      code: 'import { A2UISchema } from "@google/a2ui-express"\n\nexport const WeatherSchema = new A2UISchema({\n  name: "WeatherWidget",\n  properties: {\n    location: "string",\n    temperature: "number",\n    condition: "string"\n  }\n})',
    },
    {
      type: "paragraph",
      text: "Next, set up the prompt for the model. You instruct the model to output JSON that fits your schema. When a user asks about the weather, the model responds with the structured payload.",
    },
    {
      type: "code",
      language: "typescript",
      code: 'const systemPrompt = `\nYou are a helpful assistant.\nIf the user asks about weather, output a WeatherWidget component.\nFollow this schema format.\n\n{\n  "component": "WeatherWidget",\n  "props": {\n    "location": "City name",\n    "temperature": 72,\n    "condition": "Sunny"\n  }\n}\n`',
    },
    {
      type: "paragraph",
      text: "On the client side, read the JSON string from the stream. Map the component name to your React code. Your registry matches the incoming name to the actual frontend code.",
    },
    {
      type: "code",
      language: "typescript",
      code: 'import { WeatherWidget } from "./components/WeatherWidget"\n\nconst componentRegistry = {\n  WeatherWidget: WeatherWidget\n}\n\nexport function RenderWidget({ name, props }) {\n  const Widget = componentRegistry[name]\n  if (!Widget) return null\n  return <Widget {...props} />\n}',
    },
    {
      type: "paragraph",
      text: "This setup requires very little boilerplate code. You can implement the backend in any programming language, since the output is standard JSON. The client parses the stream and updates the display. With this simple structure, developers can add new widgets to their chat interfaces in a single day.",
    },
    {
      type: "paragraph",
      text: "Testing components is straightforward. You do not need to call the AI model to test the frontend code. You can mock the JSON payload and pass it to your renderer component. This speeds up local frontend development and layout testing. Your design team can work on component styles without running a language model.",
    },
    {
      type: "heading",
      level: 2,
      text: "What does it mean for Enterprise users?",
    },
    {
      type: "paragraph",
      text: "For large organisations, this system solves a major security problem. Running AI agents in production often raises safety questions. If an agent outputs raw HTML or executable scripts, malicious inputs can compromise the client browser. A2UI uses strict schemas. The model only sends data parameters. The frontend does the drawing, which keeps the system safe from injection attacks.",
    },
    {
      type: "paragraph",
      text: "This separation helps team workflow. One team can update the UI components, style them, and run tests. A different team can tweak the model prompt. Neither team blocks the other. The layout stays consistent with your company design library.",
    },
    {
      type: "paragraph",
      text: "Administrators can track and audit every action. Every component call generates structured JSON logs. You can see exactly what the model decided to show and what data it passed. This makes debugging and compliance work much cleaner.",
    },
    {
      type: "paragraph",
      text: "Performance is another benefit. Large organizations need to serve thousands of users simultaneously. Text streams require the browser to parse partial markdown strings repeatedly. Structured JSON messages parse quickly and render efficiently. This design reduces client CPU usage, which helps keep the user interface smooth on low-end devices.",
    },
    {
      type: "paragraph",
      text: "Compliance teams can control what information is displayed. You can implement server-side filters that check the component payload before it reaches the client. If the model tries to send sensitive data, the filter catches the issue and blocks the message. This gives enterprise companies a reliable way to monitor output.",
    },
    {
      type: "heading",
      level: 2,
      text: "Customization options",
    },
    {
      type: "paragraph",
      text: "You can customize A2UI in multiple ways. The primary method is changing component styles. The rendering happens on your client, so you have total control over CSS classes, fonts, and colors. The agent only sends the data, so your local design system defines the final look.",
    },
    {
      type: "paragraph",
      text: "You can set fallback behaviors. If the model asks for a component that does not exist in your catalog, the system can display a clean text explanation or a basic table. This prevents layout breakage.",
    },
    {
      type: "paragraph",
      text: "Another option is custom state handling. You can connect components to user actions. For example, a map component can let users click a location, and that choice sends a message back to the conversation loop. This turns static output into an interactive form.",
    },
    {
      type: "paragraph",
      text: "Internationalization is another area to customize. The frontend manages the text formatting, so the client can automatically translate keys or format numbers based on the user location. The agent does not need to handle currency symbols or date formats, which simplifies the model prompt.",
    },
    {
      type: "paragraph",
      text: "Developers can build customized registries for different user groups. A customer service agent might see charts and billing widgets. An end customer sees simplified cards. You register different component sets based on user permissions, which keeps the experience specific and secure.",
    },
    {
      type: "heading",
      level: 2,
      text: "Checkout the implementation. How does it look?",
    },
    {
      type: "paragraph",
      text: "You can try this interactive experience yourself. The chat widget on this page uses the protocol to display parts of my resume. Click the prompt buttons below to ask the assistant for details.",
    },
    {
      type: "paragraph",
      text: "Ask for my tech stack or career timeline. The response will show a custom React component instead of a text paragraph. You can inspect the network tab in your browser tools to see the raw JSON payloads streaming in real time.",
    },
    {
      type: "paragraph",
      text: "Watching the stream shows how the components render. The browser receives small data chunks and updates the interface dynamically. This process displays the UI components immediately without waiting for the full response to finish, which makes the app feel extremely fast.",
    },

    {
      type: "paragraph",
      text: "To learn more about the protocol specifications, visit the [official A2UI webpage](https://a2ui.org). You can read the [Google Cloud blog post guide](https://cloud.google.com/blog/topics/developers-practitioners/guide-to-gemini-enterprise-and-a2ui-integration) describing the core architecture of agent-to-user interfaces.",
    },
    {
      type: "interactive",
      widget: "chat-prompts",
      items: [
        "Show me your career timeline",
        "What's your tech stack?",
        "Where are you based?",
        "Tell me about community work",
      ],
    },
    {
      type: "paragraph",
      text: "This was a fun project to build. If you want, you can connect with me across my socials.",
    },
    {
      type: "quote",
      text: "Thank you so much for reading!",
    },
    {
      type: "interactive",
      widget: "socials",
    },
  ],
};
