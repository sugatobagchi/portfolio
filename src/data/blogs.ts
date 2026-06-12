export interface BlogBlock {
  type:
    | "paragraph"
    | "heading"
    | "list"
    | "code"
    | "quote"
    | "interactive"
    | "image"
    | "video";
  level?: 1 | 2 | 3;
  text?: string;
  items?: string[];
  code?: string;
  language?: string;
  widget?: string;
  url?: string;
  alt?: string;
  caption?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  gradientClass: string;
  coverImage?: string;
  content: BlogBlock[];
}

export const blogs: BlogPost[] = [
  {
    slug: "a2ui-portfolio-demo",
    title:
      "When Your Agent Stops Talking and Starts Showing: Exploring Google's A2UI",
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
        text: "The patches people reach for make things worse. Sending HTML or JavaScript fragments introduces cross-site scripting risk, visual drift from your design system, and UI injection from a remote agent you do not fully control. What is actually needed is a way to transmit UI that is as safe as data and as expressive as code.",
      },
      {
        type: "heading",
        level: 2,
        text: "What A2UI Is",
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
        text: "Where A2UI Sits in the Stack",
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
        text: "The Catalog Is the Contract",
      },
      {
        type: "paragraph",
        text: "The most important design decision in any A2UI implementation is the catalog. It is the contract between your agent and your UI. Everything the agent can render has to exist in the catalog. Everything in the catalog has to be something your frontend knows how to draw.",
      },
      {
        type: "paragraph",
        text: "This constraint is a feature. The catalog is finite and pre-approved, so you can audit it, test it, and version it independently of the agent. When you add a new component, you add it to the catalog and update the system instruction. The agent immediately gains the ability to use it, with no model retraining and no prompt injection risk. You are extending a surface, not patching a string.",
      },
      {
        type: "paragraph",
        text: "In this portfolio, the catalog has four components. A production system might have forty. The pattern is identical at either scale. Name, props schema, render function. What changes is the breadth of what the agent can express.",
      },
      {
        type: "heading",
        level: 2,
        text: "How the Same Pattern Scales from Side Project to Enterprise",
      },
      {
        type: "paragraph",
        text: "What I find genuinely interesting about A2UI is that the architectural pattern does not change between a personal side project and an enterprise deployment. The catalog model, the JSON contract, the separation between agent logic and render logic. All of it is identical. What differs is the catalog size, the infrastructure underneath, and the number of people using it.",
      },
      {
        type: "paragraph",
        text: "For a personal project, the integration surface is small. You write a few components, embed the catalog description in your system instruction, point your frontend at the JSON field. The overhead is maybe an afternoon. The payoff is that your agent can show a map, render a timeline, or display a skill matrix instead of describing them in prose.",
      },
      {
        type: "paragraph",
        text: "For enterprise, the picture looks different only in degree. Gemini Enterprise ships with a built-in A2UI renderer. The integration story for enterprise teams collapses to three steps. Build your A2A-compliant agent with a catalog and example payloads, register the agent as an A2A endpoint, and have a GE admin share it with employees like any other agent in the catalog. At runtime, GE calls your agent's endpoint and sends along its own component catalog, the list of UI components GE knows how to render. Your agent decides which component fits, emits the JSON, and GE renders it natively in GE's own design language.",
      },
      {
        type: "paragraph",
        text: "The developer never chooses a frontend framework for the GE deployment. The agent can run on Cloud Run, GKE, or on-premise. GE handles the rendering. The only thing the developer controls is the A2A endpoint and the A2UI cargo it emits.",
      },
      {
        type: "heading",
        level: 2,
        text: "Why the Clean Integration Is Not Accidental",
      },
      {
        type: "paragraph",
        text: "The clean integration story, both here and in Gemini Enterprise, is a result of keeping the layers separate. A2UI is cargo and not code, so it rides inside whatever transport pipe already exists. In this portfolio, the agent streams JSON over a standard POST response. In a production A2A deployment, A2UI rides inside A2A JSON-RPC as DataPart objects with the MIME type application/json+a2ui. The format is the same. The transport is whatever you have.",
      },
      {
        type: "paragraph",
        text: "The catalog is a registry and not a codebase, so swapping the renderer is a configuration change, not a rewrite. The Google Cloud reference implementation serves both the inline pattern (component tree with data baked in) and the decoupled pattern (component tree and data model as separate messages) from one backend, picking which to emit per request based on the client's headers. You can support multiple client types without maintaining multiple agents.",
      },
      {
        type: "paragraph",
        text: "And because the agent only emits JSON, the entire architecture is observable. Every UI decision the agent makes is a structured log entry. Debugging is not grepping strings. It is inspecting component names and prop values.",
      },
      {
        type: "heading",
        level: 2,
        text: "What This Looks Like From the User Side",
      },
      {
        type: "paragraph",
        text: "The user in this portfolio never sees any of the above. They ask a question, and instead of a paragraph, they get a rendered interface. A career timeline that flows top to bottom with animated connectors. A skill grid split by domain with color-coded sections. A Google Maps embed showing Kolkata rather than a typed address. The agent is still a language model, but the output feels like a product.",
      },
      {
        type: "paragraph",
        text: "That is the shift A2UI makes possible. Not smarter models. Not better prompts. A different medium.",
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
        type: "heading",
        level: 2,
        text: "Building Your Own",
      },
      {
        type: "paragraph",
        text: "If you want to implement A2UI in your own project, the shortest path is to start with the catalog. Identify three or four things your agent currently returns as text that would be better as a UI. Think tables, timelines, maps, card grids. Write React (or Lit, or Flutter) components for each. Describe them by name and prop shape in your system instruction. Tell the model which to use and when. Build a small client-side registry that maps name to component. Done.",
      },
      {
        type: "paragraph",
        text: "The full A2UI specification and component reference lives at [a2ui.org](https://a2ui.org). The Google Cloud reference implementation with ADK and Gemini Enterprise integration is on GitHub. This portfolio's implementation, the one running in the corner of this page, is intentionally readable. No build step, no separate service, one route handler, four catalog components.",
      },
      {
        type: "paragraph",
        text: "The next time a user asks your agent for directions and it types out an address instead of dropping a pin, that is not a model problem. That is a medium problem. And now you know how to fix it.",
      },
    ],
  },
  {
    slug: "beyond-text-gemini-embedding-2",
    title:
      "Beyond Text: Google's new Gemini Embedding 2 model is incredibly powerful, useful and can open opportunities.",
    excerpt:
      "Google's new Gemini Embedding 2 model shifts the vector landscape, natively projecting text, images, audio, and video into a single semantic space with Matryoshka Representation Learning.",
    date: "May 30, 2026",
    readTime: "12 min read",
    category: "Artificial Intelligence",
    tags: ["Gemini 2.0", "Embeddings", "Multimodal", "Vector Search"],
    gradientClass:
      "from-blue-600/20 via-indigo-600/10 to-violet-600/20 border-blue-500/20",
    coverImage: "/blogs/gemini-embeddings-2/cover.png",
    content: [
      {
        type: "paragraph",
        text: "For a long time, vector embeddings were treated as a text-only tool. Developers used them to parse documentation, build semantic query layers for PDFs, or match keywords. But the reality of how we interact with our digital lives spans far beyond sentences on a screen.",
      },
      {
        type: "paragraph",
        text: "Google's recently released [gemini-embedding-2](https://deepmind.google/models/gemini/embedding/) model completely shifts this landscape. It is natively multimodal, highly efficient, and it opens up an entirely new world of engineering opportunities.",
      },
      {
        type: "paragraph",
        text: "By setting a new standard for state-of-the-art performance, Gemini Embedding 2 delivers exceptional multimodal depth across text, images, audio, and video. Rather than orchestrating separate pipelines for different media types, this unified model projects them all into a single mathematical space. Combined with Matryoshka Representation Learning, which allows developers to dynamically scale vector dimensions from 3072 down to 1536 or 768, it bridges words, pixels, and audio frequencies with outstanding efficiency.",
      },
      {
        type: "heading",
        level: 2,
        text: "What a Unified Vector Space Actually Means?",
      },
      {
        type: "paragraph",
        text: "When you project different media types into the same coordinate system, the traditional boundaries of software engineering start to dissolve.",
      },
      {
        type: "paragraph",
        text: "Historically, if you wanted to build a feature that let users search through video clips using natural language, you had to orchestrate a fragile pipeline. You needed an audio transcription model to handle the spoken words, an image recognition model to tag object frames, and a text model to process the search query. Every layer added latency, compounded errors, and increased your cloud bill.",
      },
      {
        type: "paragraph",
        text: "With a natively multimodal embedding model, that entire pipeline debt disappears. Because text, pixels, and audio frequencies are processed by the same architecture, they naturally align.",
      },
      {
        type: "heading",
        level: 2,
        text: "My Motivation to Use This for Myself",
      },
      {
        type: "paragraph",
        text: "I have plenty of storage space at home. There is a massive 5TB external drive sitting right on my desk. Because physical local storage is incredibly cheap as a one-time purchase, I have absolutely zero interest in paying a recurring monthly or yearly subscription fee for cloud storage platforms just to host my personal files.",
      },
      {
        type: "paragraph",
        text: "But local storage comes with some serious cons.",
      },
      {
        type: "paragraph",
        text: "The moment you dump your raw trip pictures onto a local disk, you instantly lose the search liberties that make modern cloud platforms convenient. If I want to find one specific photo from my Mumbai trip where I was standing right in front of Shah Rukh Khan’s Mannat villa, my options are clunky. I have to guess the correct subfolder, scroll past hundreds of random files, and hunt for it manually.",
      },
      {
        type: "paragraph",
        text: "That is not all. If I accidentally save that photo in some other random folder, or if it gets buried inside a nested directory under a generic name, finding it takes even longer. It becomes practically invisible.",
      },
      {
        type: "heading",
        level: 2,
        text: "The Initiation of Thought",
      },
      {
        type: "paragraph",
        text: "To build this yourself, you do not need a complex data pipeline or a heavy enterprise architecture. The setup is remarkably lightweight.",
      },
      {
        type: "paragraph",
        text: "The entire project relies on a simple local structure. I store all my images inside a main root directory, neatly divided into subfolders named after each destination:",
      },
      {
        type: "image",
        url: "/blogs/gemini-embeddings-2/image-1.png",
        alt: "Folder structure with Coorg Trip and Mumbai Trip inside photos directory",
        caption: "Just trip photos, nothing else!",
      },
      {
        type: "paragraph",
        text: "By structuring the directory this way, the folder names themselves automatically act as natural metadata tags (trip_name) during the indexing process without requiring you to manually modify a single file.",
      },
      {
        type: "heading",
        level: 2,
        text: "Getting Started",
      },
      {
        type: "paragraph",
        text: "Before writing any code, we need to set up a clean, isolated Python environment and install the foundational libraries that make this local search engine tick.",
      },
      {
        type: "paragraph",
        text: "First, initialize a virtual environment in your project directory to keep dependencies contained:",
      },
      {
        type: "code",
        language: "bash",
        code: "python3 -m venv venv\nsource venv/bin/activate",
      },
      {
        type: "paragraph",
        text: "Next, install the exact packages required for handling embeddings, storage, UI processing, and HEIC image compatibility (since most of my photos were taken on an iPhone and saved in HEIC format):",
      },
      {
        type: "code",
        language: "bash",
        code: "pip install google-genai chromadb streamlit pillow pillow-heif python-dotenv",
      },
      {
        type: "paragraph",
        text: "Make sure you grab a free API key from [Google AI Studio](https://ai.dev/). Create a `.env` file in the root of your project directory and add your key:",
      },
      {
        type: "code",
        language: "text",
        code: "GEMINI_API_KEY=your_actual_api_key_here",
      },
      {
        type: "heading",
        level: 2,
        text: "The Ingestion Engine (index.py)",
      },
      {
        type: "paragraph",
        text: "The heart of our local search engine is the ingestion script. Its job is completely separated from the UI: it scans our folders, checks for duplicates, talks to the Gemini API, and updates our local database.",
      },
      {
        type: "paragraph",
        text: "Here is the complete code for `index.py`:",
      },
      {
        type: "code",
        language: "python",
        code: `import hashlib
import os
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import List, Tuple

from chromadb import PersistentClient
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

if not os.getenv("GEMINI_API_KEY"):
    raise ValueError("System Environment Error: GEMINI_API_KEY is missing.")


class PhotoIndexer:
    MODEL_NAME = "gemini-embedding-2"
    EMBEDDING_DIM = 768
    MIME_TYPES = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
        ".heic": "image/heic",
        ".heif": "image/heif",
    }

    def __init__(self, db_path: str = "chroma_db", collection_name: str = "photos"):
        self.ai_client = genai.Client()
        self.chroma_client = PersistentClient(path=os.path.abspath(db_path))
        self.collection = self.chroma_client.get_or_create_collection(
            name=collection_name, metadata={"hnsw:space": "cosine"}
        )

    @staticmethod
    def _compute_md5(file_path: Path) -> str:
        hasher = hashlib.md5()
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hasher.update(chunk)
        return hasher.hexdigest()

    def _generate_image_embedding(self, file_path: Path) -> List[float]:
        try:
            suffix = file_path.suffix.lower()
            mime_type = self.MIME_TYPES.get(suffix, "image/jpeg")

            with open(file_path, "rb") as f:
                image_bytes = f.read()

            response = self.ai_client.models.embed_content(
                model=self.MODEL_NAME,
                contents=types.Part.from_bytes(data=image_bytes, mime_type=mime_type),
                config=types.EmbedContentConfig(
                    task_type="RETRIEVAL_DOCUMENT",
                    output_dimensionality=self.EMBEDDING_DIM,
                ),
            )
            return response.embeddings[0].values
        except Exception as e:
            print(f"Embedding Generation Failed for {file_path.name}: {e}")
            raise

    def _process_single_file(self, file_path: Path) -> Tuple[bool, str]:
        file_hash = self._compute_md5(file_path)
        existing = self.collection.get(ids=[file_hash])

        if existing and existing["ids"]:
            return False, "cached"

        try:
            print(f"Indexing asset: {file_path.name}")
            embedding = self._generate_image_embedding(file_path)
            self.collection.add(
                embeddings=[embedding],
                metadatas=[
                    {
                        "file_path": str(file_path),
                        "filename": file_path.name,
                        "trip_name": file_path.parent.name,
                    }
                ],
                ids=[file_hash],
            )
            return True, "indexed"
        except Exception:
            return False, "failed"

    def index_directory(
        self, root_folder: str = "photos", max_workers: int = 4
    ) -> None:
        root_path = Path(root_folder)
        if not root_path.exists():
            root_path.mkdir(exist_ok=True)
            print(
                f"Target directory '{root_folder}' initialized. Populate files and restart."
            )
            return

        print(f"Scanning target location: '{root_path.resolve()}'")

        target_files = [
            p
            for p in root_path.rglob("*")
            if p.is_file() and p.suffix.lower() in self.MIME_TYPES
        ]

        new_indexed = 0
        skipped = 0

        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            futures = {
                executor.submit(self._process_single_file, fp): fp
                for fp in target_files
            }

            for future in as_completed(futures):
                success, status = future.result()
                if success:
                    new_indexed += 1
                elif status == "cached":
                    skipped += 1

        print(
            f"\\nExecution Completed | New Indexed: {new_indexed} | Cached Skipped: {skipped}"
        )


if __name__ == "__main__":
    indexer = PhotoIndexer()
    indexer.index_directory("photos", max_workers=4)`,
      },
      {
        type: "paragraph",
        text: "To understand exactly how this file transforms your raw drive data into a semantic search system, let's break down the execution flow step-by-step:",
      },
      {
        type: "list",
        items: [
          "**1. Initialization**: When you run the script, it spins up the Google GenAI client and creates a local, persistent database folder (chroma_db). It configures the database to use Cosine Similarity to measure image matching and sets the embedding dimensions to 768 to keep storage light (the model natively supports larger dimensions of 1536 and 3072 for higher precision).",
          "**2. Directory Scanning**: The engine scans your photos/ folder recursively. It identifies valid image files, naturally handling standard formats like .jpg and .png as well as mobile formats like .heic and .heif while ignoring hidden system clutter.",
          "**3. Duplicate Prevention (MD5 Hashing)**: Before hitting the API, the script reads each photo in tiny 4KB chunks to calculate a unique MD5 cryptographic fingerprint. It checks ChromaDB for this ID. If the fingerprint exists, it instantly skips the file. This ensures you never waste bandwidth or tokens on duplicate images.",
          "**4. Vector Generation**: For brand-new photos, the script reads the raw bytes, wraps them in a Part.from_bytes object, and sends them to the gemini-embedding-2 model. Gemini analyzes the pixels and translates the entire visual concept into a mathematical vector of 768 floating-point numbers.",
          "**5. Metadata Storage**: The script saves the image vector, its MD5 hash, and metadata into ChromaDB. It automatically grabs file_path.parent.name to use as the trip_name. Because your folders are named after your destinations (like Coorg or Mumbai), the system tags your photos automatically.",
          "**6. Parallel Processing**: Instead of uploading images one by one, the script uses a ThreadPoolExecutor to process multiple images concurrently over parallel network channels. This eliminates system idle time and indexes your entire local library in a flash.",
        ],
      },
      {
        type: "paragraph",
        text: "For my local setup, this entire process took around 15-20 minutes and successfully indexed around 1,600 photos!",
      },
      {
        type: "heading",
        level: 2,
        text: "The Frontend UI (app.py)",
      },
      {
        type: "paragraph",
        text: "With our image database, we need a simple, interactive browser interface. This is where Streamlit shines, letting us spin up a clean web app in under 100 lines of pure Python.",
      },
      {
        type: "paragraph",
        text: "Here is the complete code for `app.py`:",
      },
      {
        type: "code",
        language: "python",
        code: `import os
from pathlib import Path

import chromadb
from dotenv import load_dotenv
from google import genai
from google.genai import types
from PIL import Image
import pillow_heif
import streamlit as st

load_dotenv()

if not os.getenv("GEMINI_API_KEY"):
    st.error("System Environment Error: GEMINI_API_KEY is missing from .env")
    st.stop()

st.set_page_config(page_title="AI Photo Memory Search", layout="wide")
st.title("📸 AI Photo Memory Search")


@st.cache_resource
def init_search_engine():
    ai_client = genai.Client()
    db_path = os.path.abspath("chroma_db")
    chroma_client = chromadb.PersistentClient(path=db_path)
    collection = chroma_client.get_or_create_collection(
        name="photos", 
        metadata={"hnsw:space": "cosine"}
    )
    return ai_client, collection


ai_client, collection = init_search_engine()


def get_text_embedding(query_text: str) -> list[float]:
    formatted_query = f"task: search result | query: {query_text}"
    response = ai_client.models.embed_content(
        model="gemini-embedding-2",
        contents=formatted_query,
        config=types.EmbedContentConfig(
            task_type="RETRIEVAL_QUERY",
            output_dimensionality=768,
        ),
    )
    return response.embeddings[0].values


def load_visual_asset(file_path: Path) -> Image.Image:
    if file_path.suffix.lower() in {".heic", ".heif"}:
        heif_file = pillow_heif.open_heif(str(file_path))
        return Image.frombytes(
            heif_file.mode,
            heif_file.size,
            heif_file.data,
            "raw",
        )
    return Image.open(file_path)


query = st.text_input(
    "What are you looking for?", 
    placeholder="e.g., 'waterfalls in Coorg', 'street food in Mumbai'"
)

limit = st.slider("Number of results", min_value=1, max_value=24, value=8)

if query.strip():
    with st.spinner("Searching semantic space..."):
        try:
            query_vector = get_text_embedding(query)
            results = collection.query(
                query_embeddings=[query_vector], 
                n_results=limit
            )

            if not results or not results["ids"] or not results["ids"][0]:
                st.warning("No matching visual records located.")
            else:
                COLUMNS_PER_ROW = 4 
                cols = st.columns(COLUMNS_PER_ROW)
                
                for i in range(len(results["ids"][0])):
                    metadata = results["metadatas"][0][i]
                    distance = results["distances"][0][i]
                    confidence = (1 - distance) * 100

                    file_path = Path(metadata["file_path"])
                    col_index = i % COLUMNS_PER_ROW

                    with cols[col_index]:
                        with st.container(border=True):
                            if file_path.exists():
                                try:
                                    img = load_visual_asset(file_path)
                                    st.image(img, use_column_width=True)
                                except Exception as img_err:
                                    st.error(f"Rendering error: {img_err}")
                            else:
                                st.error(f"File missing at: {file_path}")

                            st.caption(
                                f"📍 **Trip:** {metadata['trip_name']}  \\n"
                                f"🎯 **Match:** {confidence:.1f}%"
                            )
        except Exception as e:
            st.error(f"Search Execution Failed: {e}")`,
      },
      {
        type: "paragraph",
        text: "Nothing fancy here. The code works as a seamless, reactive loop that brings your local files to life. When the app boots, it establishes persistent connections to Gemini and your local database exactly once using Streamlit resource caching to keep the interface fast and responsive. The moment you type a search phrase into the interface, the engine routes your text query to the Gemini API, translating your words into the exact same 768-dimensional mathematical vector used during your background indexing phase.",
      },
      {
        type: "paragraph",
        text: "This query vector is passed directly into ChromaDB, which uses its fast HNSW graph index to calculate the angular gap between your thoughts and your stored image data, instantly returning the top candidates along with a human-readable match confidence score. Finally, the app uses a custom imaging pipeline to natively decode standard images and mobile formats like `.heic` or `.heif` directly from your hard drive, dynamically distributing the files across a clean, responsive four-column grid alongside their automatically extracted trip labels.",
      },
      {
        type: "heading",
        level: 2,
        text: "Showtime",
      },
      {
        type: "paragraph",
        text: "With both the background indexer and the frontend application fully configured, it is time for the payoff. I recorded a quick demonstration video to show exactly how this entire setup behaves in a real, live browser session.",
      },
      {
        type: "video",
        url: "/blogs/gemini-embeddings-2/video-2.mp4",
        caption: "A Small Video Demonstration",
      },
      {
        type: "heading",
        level: 2,
        text: "The Cost Breakdown",
      },
      {
        type: "paragraph",
        text: "For this build, I ran **1,600 photos** through the `gemini-embedding-2` model to generate the 768-dimensional vectors. The final cost for indexing that entire vacation library was **just ₹17**. or **$0.2**.",
      },
      {
        type: "image",
        url: "/blogs/gemini-embeddings-2/image-3.png",
        alt: "Gemini embedding API indexing cost breakdown chart",
        caption: "Google AI Studio billing console.",
      },
      {
        type: "paragraph",
        text: "While the cost is practically negligible, we really hope to see an open-source version of this model in the future.",
      },
      {
        type: "heading",
        level: 2,
        text: "What is Next?",
      },
      {
        type: "paragraph",
        text: "Because this architecture is fully modular, you can easily swap the local folder scanner for other data sources:",
      },
      {
        type: "list",
        items: [
          "**Cloud Sync**: Connect the indexing pipeline to a Google Drive or Dropbox API to automatically catalog cloud uploads.",
          "**Unified Workspace Search**: Point the model at a mixed directory of PDFs, receipts, and screen recordings to create a personal local search engine.",
        ],
      },
      {
        type: "paragraph",
        text: "My idea was to just use my hard drive and not pay a subscription to store images while having the same features that they offer.",
      },
      {
        type: "heading",
        level: 2,
        text: "Wrapping Up",
      },
      {
        type: "paragraph",
        text: "The complete codebase for this project is open-source. Go ahead and try it out on your own machine:",
      },
      {
        type: "paragraph",
        text: "[GitHub: gemini-embedding-2-local-photos](https://github.com/sugatobagchi/gemini-embedding-2-local-photos)",
      },
      {
        type: "paragraph",
        text: "This was a fun project to build. If you want, you can connect with me across my socials. And if you like the project, do not forget to drop a star on the project!",
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
  },
];
