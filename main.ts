// Fortune Cookie for the Liquidated Trader
// Writes a single fortune-cookie line for a crypto trader who has just
// been liquidated, then checks the competition gates itself.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Fortune smiles at last, liquidated trader: with nothing left to lose, your next trade can only go up.";

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function main(): void {
  // Gate: 1-160 characters, not only whitespace, and at most 20 words.
  // Checked here so a bad line fails loudly instead of shipping.
  const chars = ENTRY.length;
  const words = wordCount(ENTRY);
  if (ENTRY.trim().length === 0 || chars < 1 || chars > 160) {
    throw new Error(`gate failed: entry is ${chars} characters (must be 1-160)`);
  }
  if (words > 20) {
    throw new Error(`gate failed: entry is ${words} words (must be at most 20)`);
  }
  const outDir =
    process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote entry.txt (${chars} chars, ${words} words)`);
}

main();
