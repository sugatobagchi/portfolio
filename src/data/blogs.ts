export interface BlogBlock {
  type: "paragraph" | "heading" | "list" | "code" | "quote" | "interactive" | "image" | "video";
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
          "**5. Metadata Storage**: The script saves the image vector, its MD5 hash, and key metadata into ChromaDB. It automatically grabs file_path.parent.name to use as the trip_name. Because your folders are named after your destinations (like Coorg or Mumbai), the system tags your photos automatically.",
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
        text: "With our image database populated, we need a simple, interactive browser interface. This is where Streamlit shines, letting us spin up a clean web app in under 100 lines of pure Python.",
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
          "**Unified Workspace Search**: Point the model at a mixed directory of PDFs, receipts, and screen recordings to create a personal local search engine."
        ]
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
