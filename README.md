# IdeaForge Blueprint: GuardRail AI - Zero-Hallucination PR Reviewer

> Deterministic AST-Constrained Code Security & Automated Patch Generation

## 🎯 Executive Summary
GuardRail AI bridges static analysis and neural code LLMs. By running a local WASM AST engine before dispatching prompts to Gemini Flash, it enforces deterministic safety invariants, guaranteeing syntactically valid and zero-false-positive security feedback.

## 🚨 Problem Statement
Engineering teams waste hours wading through noisy AI code review tools that post generic or syntactically invalid comments.

## 💡 Unique Value Proposition
Sub-15s PR comments with 0% syntax hallucination rate via WASM Tree-Sitter pre-filtering.

---

## 🏗️ System Architecture
### Node 01: GitHub Webhook / Action Runner (Octokit / Node.js)
- **Category**: Frontend
- **Description**: Triggers on pull_request.opened and sync events.

### Node 02: WASM AST Tree-Sitter Parser (Tree-Sitter / Rust WASM)
- **Category**: Backend / LLM
- **Description**: Extracts exact diff symbols, functions, and import trees.

### Node 03: Gemini 1.5 Flash Reasoning Engine (Gemini Flash API)
- **Category**: Backend / LLM
- **Description**: Generates security risk explanations & fix code chunks.

### Node 04: Deterministic AST Sanity Validator (TypeScript AST Compiler)
- **Category**: Storage / Vector
- **Description**: Validates generated patches compile cleanly before posting.

### Node 05: Telegram Alert & PR Comment Dispatcher (Telegram Bot API + GitHub API)
- **Category**: Integration / Agent
- **Description**: Posts formatted PR review and notifies lead dev on Telegram.

---

## ⚙️ Tech Stack
- **Frontend / Orchestration**: Next.js 14 App Router + Octokit
  - *Rationale*: Unified API routes & server actions for fast GitHub API webhooks.
  - *Alternatives*: Express.js, FastAPI
- **LLM Reasoning Engine**: Gemini 1.5 Flash
  - *Rationale*: Fast 1M token context window with free tier suitable for live hackathon demo.
  - *Alternatives*: Claude 3.5 Sonnet, GPT-4o-mini
- **AST Parsing**: web-tree-sitter (WASM)
  - *Rationale*: Runs directly in Node/Vercel edge environment without installing native binaries.
  - *Alternatives*: Babel Parser, ESTree
- **Database & Embeddings**: Supabase Postgres + pgvector
  - *Rationale*: Single service for relational user data and vector embeddings.
  - *Alternatives*: Pinecone, ChromaDB

---

## 🔌 Recommended APIs & Datasets
- **GitHub REST & GraphQL API v4** (Third-Party API): Accesses pull request diffs, code commits, branch trees, and posts inline review comments directly on GitHub PR lines.
  - *Use Case*: Primary input/output interface for fetching PR diffs and posting verified security suggestions.
  - *Access*: [https://docs.github.com/en/rest](https://docs.github.com/en/rest) (Free (5,000 req/hr authenticated))
- **web-tree-sitter WASM Engine** (SDK / Library): Client and server-side WebAssembly port of Tree-Sitter for incremental AST parsing across 40+ programming languages.
  - *Use Case*: Extracts exact function boundaries and syntax nodes before sending prompt context to Gemini.
  - *Access*: [https://github.com/tree-sitter/tree-sitter](https://github.com/tree-sitter/tree-sitter) (Open Source (MIT License))
- **SWE-Bench Benchmark Dataset** (Public Dataset): Evaluation benchmark dataset containing 2,294 real software engineering problems extracted from GitHub issues and PRs.
  - *Use Case*: Benchmarking patch accuracy and self-correction performance against existing AI coding agents.
  - *Access*: [https://www.swebench.com](https://www.swebench.com) (Open Data (CC BY 4.0))
- **OSV.dev Vulnerability API** (Third-Party API): Distributed open-source vulnerability database API providing precise package and commit vulnerability signatures.
  - *Use Case*: Queries CVE advisories and zero-day signatures for identified project dependencies.
  - *Access*: [https://osv.dev](https://osv.dev) (Free Public REST API)

---

## ⏱️ Development Roadmap & Timeline
- **Total Build Estimate**: 64 Hours (4 Weeks)
- **Critical Path**: Tree-Sitter WASM Diff Chunker → Gemini Patch Reasoning → Sub-process Syntax Test Pass
- **Phase 1: Foundations & AST Engine** (Week 1 (16h)): Build deterministic AST parser & diff chunker
- **Phase 2: Gemini Synthesis & Guardrail** (Week 2 (18h)): Implement patch generation & AST sanity validator
- **Phase 3: GitHub PR Bot & Telegram Agent** (Week 3 (15h)): Connect live webhooks & PR inline commenting
- **Phase 4: Benchmarking & Deployment** (Week 4 (15h)): Run SWE-Bench evaluation & deploy to Vercel

---

## 📅 Milestones Roadmap & Actionable Tasks
### Sprint 1: Phase 1: AST Extraction & Diff Parser Engine (3 Days (16 Hours))
- [ ] Task 1.1: Initialize web-tree-sitter WASM bindings inside Node/Edge runtime
- [ ] Task 1.2: Build Git diff chunker to extract modified AST nodes & scope
- [ ] Task 1.3: Unit test multi-file AST symbol parsing across TypeScript and Python
- **Deliverables**: GitHub Action trigger setup, WASM Tree-Sitter integration extracting diff context
- **Risk**: Large multi-file diffs over-tokenizing request payload

### Sprint 2: Phase 2: Gemini Security Prompting & Guardrail (4 Days (18 Hours))
- [ ] Task 2.1: Write system prompt steering Gemini 1.5 Flash for code security auditing
- [ ] Task 2.2: Integrate OSV.dev vulnerability lookup for dependency CVE checks
- [ ] Task 2.3: Build AST sanity validator to verify generated patches compile cleanly
- **Deliverables**: Gemini 1.5 Flash prompt pipeline, AST sanity checker verifying patch validity
- **Risk**: LLM returning Markdown formatting surrounding code blocks

### Sprint 3: Phase 3: Telegram Notification Bot & Live PR Comments (3 Days (15 Hours))
- [ ] Task 3.1: Register Telegram Bot API webhook listener for critical alert dispatch
- [ ] Task 3.2: Format markdown review comments with inline code diff suggestions
- [ ] Task 3.3: Handle GitHub pull_request webhook signatures & security headers
- **Deliverables**: Telegram bot webhook alert for high-risk vulnerabilities, GitHub inline comment poster
- **Risk**: Telegram bot API rate limits on fast commits

### Sprint 4: Phase 4: Dashboard, Benchmarking & Public Demo (4 Days (15 Hours))
- [ ] Task 4.1: Run benchmark accuracy evaluation on SWE-Bench sample subset
- [ ] Task 4.2: Deploy serverless webhook worker & dashboard to Vercel
- [ ] Task 4.3: Export complete documentation & starter GitHub repo
- **Deliverables**: IdeaForge workspace dashboard with analytics, Public GitHub repo demonstration
- **Risk**: Vercel serverless function timeout on 30s limit

---

*Generated by [IdeaForge AI Research & Innovation Copilot](https://github.com)*
