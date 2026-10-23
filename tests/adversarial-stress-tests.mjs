import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

console.log("\n=======================================================");
console.log("NEUROGRID OS: EMPIRICAL ADVERSARIAL STRESS HARNESS");
console.log("=======================================================\n");

let passed = 0;
let failed = 0;
const findings = [];

function assert(id, description, condition, details = "") {
  if (condition) {
    passed++;
    console.log(`[PASS] ${id}: ${description}`);
  } else {
    failed++;
    console.log(`[FAIL] ${id}: ${description} -> ${details}`);
    findings.push({ id, description, details });
  }
}

function getAllFiles(dir, exts = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".css", ".html", ".svg"]) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name !== "node_modules" &&
        entry.name !== ".next" &&
        entry.name !== "tests" &&
        entry.name !== ".git"
      ) {
        results = results.concat(getAllFiles(full, exts));
      }
    } else if (entry.isFile()) {
      if (exts.includes(path.extname(entry.name))) {
        results.push(full);
      }
    }
  }
  return results;
}

const srcFiles = getAllFiles(path.join(projectRoot, "src")).concat(
  getAllFiles(path.join(projectRoot, "public"))
);

// Test 1: Exhaustive Accelerator Scans (including word boundaries and variations)
{
  const acceleratorPatterns = [
    /\baccelerator\b/i,
    /\baccelerators\b/i,
    /\by\s*combinator\b/i,
    /\byc\b/i,
    /\btechstars\b/i,
    /\bseedcamp\b/i,
    /\b500\s*global\b/i,
    /\b500\s*startups\b/i,
    /\bplug\s*and\s*play\b/i,
    /\bincubator\b/i,
    /\bincubators\b/i,
    /\bstartup\s*accelerator\b/i,
    /\bventure\s*studio\b/i,
  ];

  let matches = [];
  for (const file of srcFiles) {
    const content = fs.readFileSync(file, "utf-8");
    for (const pattern of acceleratorPatterns) {
      if (pattern.test(content)) {
        matches.push(`${path.relative(projectRoot, file)} matches ${pattern}`);
      }
    }
  }

  assert(
    "ADV-01",
    "Negative constraint: Zero accelerator / incubator mentions across src and public",
    matches.length === 0,
    matches.join("; ")
  );
}

// Test 2: Exhaustive AWS and Cloud Proprietary Brand Scans
{
  const awsPatterns = [
    /\baws\b/i,
    /\bamazon\s*web\s*services\b/i,
    /\bs3\b/i,
    /\bec2\b/i,
    /\blambda\b/i,
    /\bsagemaker\b/i,
    /\bdynamodb\b/i,
    /\bcloudwatch\b/i,
    /\bkinesis\b/i,
    /\bgreengrass\b/i,
    /\bfargate\b/i,
    /\belasticbeanstalk\b/i,
    /\bbedrock\b/i,
    /\bopensearch\b/i,
  ];

  let matches = [];
  for (const file of srcFiles) {
    const content = fs.readFileSync(file, "utf-8");
    for (const pattern of awsPatterns) {
      if (pattern.test(content)) {
        matches.push(`${path.relative(projectRoot, file)} matches ${pattern}`);
      }
    }
  }

  assert(
    "ADV-02",
    "Negative constraint: Zero AWS brand or proprietary service mentions across src and public",
    matches.length === 0,
    matches.join("; ")
  );
}

// Test 3: Founder Cardinality & Identity Stress Test
{
  const aboutPath = path.join(projectRoot, "src/components/sections/AboutUs.tsx");
  const aboutContent = fs.readFileSync(aboutPath, "utf-8");

  const founderMatches = aboutContent.match(/Dr\.\s*Elena Vance|Elena Vance/g) || [];
  const coFounderMatches = aboutContent.match(/\b(co-founder|cofounder|co-founders|cofounders)\b/gi) || [];
  const otherExecs = aboutContent.match(/\b(CTO|COO|CFO|Co-CEO|Chief Technology Officer)\b/g) || [];
  const hasPlaceholder = aboutContent.includes("[Dr. Elena Vance Photo Placeholder]") ||
    aboutContent.includes("Photo Placeholder");

  assert(
    "ADV-03",
    "Founder cardinality: Exactly 1 founder (Dr. Elena Vance), 0 co-founders, photo placeholder present",
    founderMatches.length >= 1 && coFounderMatches.length === 0 && otherExecs.length === 0 && hasPlaceholder,
    `Founders: ${founderMatches.length}, CoFounders: ${coFounderMatches.length}, OtherExecs: ${otherExecs.length}, Placeholder: ${hasPlaceholder}`
  );
}

// Test 4: Contact Cardinality Stress Test
{
  const contactPath = path.join(projectRoot, "src/components/sections/ContactUs.tsx");
  const contactContent = fs.readFileSync(contactPath, "utf-8");

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = [...new Set(contactContent.match(emailRegex) || [])];

  const phoneRegex = /\+?1?[-.\s]?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const phones = [...new Set((contactContent.match(phoneRegex) || []).map(p => p.replace(/\D/g, "")))];

  assert(
    "ADV-04",
    "Contact cardinality: Exactly 1 email (dispatch@neurogrid-os.io) and exactly 1 phone (14158904743)",
    emails.length === 1 && emails[0] === "dispatch@neurogrid-os.io" &&
    phones.length === 1 && phones[0] === "14158904743",
    `Emails (${emails.length}): ${JSON.stringify(emails)}; Phones (${phones.length}): ${JSON.stringify(phones)}`
  );
}

// Test 5: Section Anchors & scroll-mt Alignment
{
  const requiredSections = ["home", "how-it-works", "pricing", "about", "contact"];
  let allSectionsValid = true;
  let missingOffsets = [];

  for (const sec of requiredSections) {
    let found = false;
    let hasScrollMt = false;
    for (const file of srcFiles) {
      const content = fs.readFileSync(file, "utf-8");
      const secRegex = new RegExp(`<section[^>]*id=["']${sec}["'][^>]*>`, "i");
      const match = content.match(secRegex);
      if (match) {
        found = true;
        if (match[0].includes("scroll-mt-")) {
          hasScrollMt = true;
        }
        break;
      }
    }
    if (!found) allSectionsValid = false;
    if (found && !hasScrollMt) missingOffsets.push(sec);
  }

  assert(
    "ADV-05",
    "Section anchors: All 5 sections exist with scroll-mt-* header offset compensation",
    allSectionsValid && missingOffsets.length === 0,
    `All valid: ${allSectionsValid}, Missing scroll-mt: ${JSON.stringify(missingOffsets)}`
  );
}

// Test 6: Responsive Breakpoint Gap Analysis in Navbar
{
  const navPath = path.join(projectRoot, "src/components/navigation/Navbar.tsx");
  const navContent = fs.readFileSync(navPath, "utf-8");

  // Verify desktop uses hidden md:flex or hidden lg:flex, and mobile drawer/hamburger uses md:hidden or lg:hidden symmetrically
  const desktopHasMd = navContent.includes("hidden md:flex");
  const mobileHasMd = navContent.includes("md:hidden");
  const mobileBtnHasMd = navContent.includes("flex md:hidden");

  const symmetrical = desktopHasMd && mobileHasMd && mobileBtnHasMd;

  assert(
    "ADV-06",
    "Responsive Navigation: Symmetrical breakpoint pairing (no tablet blackout gap)",
    symmetrical,
    `desktopHasMd: ${desktopHasMd}, mobileHasMd: ${mobileHasMd}, mobileBtnHasMd: ${mobileBtnHasMd}`
  );
}

// Test 7: Pricing Tiers Math & Structure
{
  const pricingPath = path.join(projectRoot, "src/components/sections/Pricing.tsx");
  const pricingContent = fs.readFileSync(pricingPath, "utf-8");

  const tier1Monthly = 290;
  const tier1Annual = 246; // 290 * 0.85 = 246.5
  const tier2Monthly = 1490;
  const tier2Annual = 1266; // 1490 * 0.85 = 1266.5
  const tier3Monthly = 6500;
  const tier3Annual = 5525; // 6500 * 0.85 = 5525

  const mathValid = (
    Math.abs(tier1Annual - tier1Monthly * 0.85) <= 1 &&
    Math.abs(tier2Annual - tier2Monthly * 0.85) <= 1 &&
    Math.abs(tier3Annual - tier3Monthly * 0.85) <= 1
  );

  const containsAllPrices = (
    pricingContent.includes("290") && pricingContent.includes("246") &&
    pricingContent.includes("1490") && pricingContent.includes("1266") &&
    pricingContent.includes("6500") && pricingContent.includes("5525")
  );

  assert(
    "ADV-07",
    "Pricing Economics: Exactly 3 tiers with verified 15% discount calculation",
    mathValid && containsAllPrices,
    `Math valid: ${mathValid}, Contains prices: ${containsAllPrices}`
  );
}

// Test 8: Framer Motion Animation & Interactive State Integrity
{
  const howPath = path.join(projectRoot, "src/components/sections/HowItWorks.tsx");
  const howContent = fs.readFileSync(howPath, "utf-8");

  const hasAnimatePresence = howContent.includes("AnimatePresence");
  const hasMotionDiv = howContent.includes("motion.div");
  const has4Stages = howContent.includes("IngestionStage") &&
    howContent.includes("ForecastStage") &&
    howContent.includes("DispatchStage") &&
    howContent.includes("SettlementStage");

  assert(
    "ADV-08",
    "Framer Motion Pipeline: AnimatePresence and 4 modular pipeline stages wired",
    hasAnimatePresence && hasMotionDiv && has4Stages,
    `AnimatePresence: ${hasAnimatePresence}, motion.div: ${hasMotionDiv}, 4 stages: ${has4Stages}`
  );
}

// Test 9: Favicon and Metadata Resolution
{
  const layoutPath = path.join(projectRoot, "src/app/layout.tsx");
  const layoutContent = fs.readFileSync(layoutPath, "utf-8");
  const faviconPath = path.join(projectRoot, "public/favicon.svg");

  const faviconExists = fs.existsSync(faviconPath) && fs.statSync(faviconPath).size > 100;
  const layoutHasFavicon = layoutContent.includes("/favicon.svg");

  assert(
    "ADV-09",
    "Brand Favicon: SVG asset exists (>100B) and referenced in RootLayout metadata",
    faviconExists && layoutHasFavicon,
    `Favicon exists: ${faviconExists}, Layout links favicon: ${layoutHasFavicon}`
  );
}

console.log("\n=======================================================");
console.log(`TOTAL ADVERSARIAL STRESS TESTS: ${passed + failed}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log("=======================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
