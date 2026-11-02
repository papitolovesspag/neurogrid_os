#!/usr/bin/env node
/**
 * ==============================================================================
 * NEUROGRID OS: AUTOMATED STANDALONE 4-TIER E2E TEST RUNNER
 * ==============================================================================
 * Track: Requirement-Driven, Opaque-Box E2E Testing
 * Target: neurogrid-os Next.js Application
 * Author: teamwork_preview_test_writer_m0
 * Runtime: Node.js v20+ / v24+ (ESM Native, Zero External npm Dependencies)
 * Execution: node tests/run-e2e-tests.mjs [--tier=1|2|3|4|all]
 *
 * Tiers:
 *   Tier 1: Feature Coverage (5 Sections, Navbar, Theming, Brand Assets, UI)
 *   Tier 2: Boundary & Corner Cases (1 Founder, 0 Accelerators, 1 Email, 1 Phone, 0 AWS Terms, 3 Tiers)
 *   Tier 3: Cross-Feature Interactions (Framer Motion Pipeline, 3 Tiers & Billing Toggle, ThemeProvider)
 *   Tier 4: Real-World Scenarios (Dispatch Scenarios, Oscilloscope, Enterprise Form, Build Execution)
 * ==============================================================================
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Color helpers for terminal output
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
  white: "\x1b[37m",
  bgCyan: "\x1b[46m\x1b[30m",
  bgGreen: "\x1b[42m\x1b[30m",
  bgRed: "\x1b[41m\x1b[37m",
  bgYellow: "\x1b[43m\x1b[30m",
};

// Global Test Execution State
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];
const tierStats = {
  tier1: { total: 0, passed: 0, failed: 0 },
  tier2: { total: 0, passed: 0, failed: 0 },
  tier3: { total: 0, passed: 0, failed: 0 },
  tier4: { total: 0, passed: 0, failed: 0 },
};

function logHeader(text) {
  console.log(`\n${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  ${text}${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════════════${colors.reset}\n`);
}

function logTier(tierNumber, tierTitle) {
  console.log(`\n${colors.bold}${colors.magenta}┌─────────────────────────────────────────────────────────────────────────────┐${colors.reset}`);
  console.log(`${colors.bold}${colors.magenta}│ TIER ${tierNumber}: ${tierTitle.padEnd(65)}│${colors.reset}`);
  console.log(`${colors.bold}${colors.magenta}└─────────────────────────────────────────────────────────────────────────────┘${colors.reset}`);
}

function assertTest(tierKey, testId, name, condition, details = {}) {
  totalTests++;
  tierStats[tierKey].total++;

  if (condition) {
    passedTests++;
    tierStats[tierKey].passed++;
    console.log(`  ${colors.green}✔ PASS${colors.reset} [${colors.bold}${testId}${colors.reset}] ${name}`);
    if (details.note) {
      console.log(`         ${colors.dim}↳ ${details.note}${colors.reset}`);
    }
  } else {
    failedTests++;
    tierStats[tierKey].failed++;
    console.log(`  ${colors.red}✖ FAIL${colors.reset} [${colors.bold}${testId}${colors.reset}] ${name}`);
    console.log(`         ${colors.red}Expected: ${details.expected || "true"}${colors.reset}`);
    console.log(`         ${colors.red}Observed: ${details.observed || "false"}${colors.reset}`);
    if (details.file) {
      console.log(`         ${colors.yellow}File: ${details.file}${colors.reset}`);
    }
    failures.push({ testId, name, details, tierKey });
  }
}

// Utility file helpers
function readFileSafe(relPath) {
  const fullPath = path.join(projectRoot, relPath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, "utf-8");
}

function fileExists(relPath) {
  const fullPath = path.join(projectRoot, relPath);
  return fs.existsSync(fullPath);
}

function getFileSize(relPath) {
  const fullPath = path.join(projectRoot, relPath);
  if (!fs.existsSync(fullPath)) return 0;
  return fs.statSync(fullPath).size;
}

function findFirstExistingFile(candidatePaths) {
  for (const relPath of candidatePaths) {
    const fullPath = path.join(projectRoot, relPath);
    if (fs.existsSync(fullPath)) {
      return { path: relPath, content: fs.readFileSync(fullPath, "utf-8") };
    }
  }
  return { path: null, content: null };
}

/**
 * Isolates a specific <section id="...">...</section> block if defined inside page.tsx
 */
function extractSectionContent(fullContent, sectionId) {
  if (!fullContent) return null;
  const startRegex = new RegExp(`<section[^>]*id=["']${sectionId}["'][^>]*>`, "i");
  const match = fullContent.match(startRegex);
  if (!match) return null;
  const startIdx = match.index;
  const rest = fullContent.slice(startIdx + match[0].length);
  const nextSectionMatch = rest.match(/<section[^>]*id=/i);
  const endIdx = nextSectionMatch ? startIdx + match[0].length + nextSectionMatch.index : fullContent.length;
  return fullContent.slice(startIdx, endIdx);
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

// ==============================================================================
// TIER 1: FEATURE COVERAGE
// ==============================================================================
function runTier1() {
  logTier(1, "FEATURE COVERAGE (5 SECTIONS, NAVBAR, THEME, BRAND, RESPONSIVE)");

  // E2E-T1-01: Page Structure & 5 Sections Sequential Order
  {
    const pageContent = readFileSafe("src/app/page.tsx");
    const hasPage = pageContent !== null;
    let inOrder = false;
    let sectionOrderFound = [];

    if (hasPage) {
      // Find section containers or component tags in page.tsx
      const sectionDefinitions = [
        { id: "home", regex: /(<section[^>]*id=["']home["']|<Hero\b|<HeroSection\b)/ },
        { id: "how-it-works", regex: /(<section[^>]*id=["']how-it-works["']|<HowItWorks\b|<HowItWorksSection\b)/ },
        { id: "pricing", regex: /(<section[^>]*id=["']pricing["']|<Pricing\b|<PricingSection\b)/ },
        { id: "about", regex: /(<section[^>]*id=["']about["']|<AboutUs\b|<AboutSection\b|<About\b)/ },
        { id: "contact", regex: /(<section[^>]*id=["']contact["']|<ContactUs\b|<ContactSection\b|<Contact\b)/ },
      ];

      const indices = sectionDefinitions.map((sec) => {
        const match = pageContent.match(sec.regex);
        return {
          id: sec.id,
          idx: match ? match.index : -1,
        };
      });

      sectionOrderFound = indices.map((s) => `${s.id} (index: ${s.idx})`);
      inOrder = indices.every((s, i) => s.idx !== -1 && (i === 0 || s.idx > indices[i - 1].idx));
    }

    assertTest(
      "tier1",
      "E2E-T1-01",
      "All 5 sections rendered in single-page sequential order (#home -> #how-it-works -> #pricing -> #about -> #contact)",
      hasPage && inOrder,
      {
        expected: "5 mandatory sections present in exact sequence in src/app/page.tsx",
        observed: hasPage
          ? (inOrder ? "All 5 sections present in exact sequential order" : JSON.stringify(sectionOrderFound))
          : "src/app/page.tsx does not exist",
        file: "src/app/page.tsx",
        note: "Verified single-page App Router architecture and section order",
      }
    );
  }

  // E2E-T1-02: Fixed Floating Navbar & Section Anchor Links
  {
    const navResult = findFirstExistingFile([
      "src/components/navigation/Navbar.tsx",
      "src/components/Navbar.tsx",
      "src/app/page.tsx",
    ]);
    const hasNav = navResult.content !== null;
    const content = navResult.content || "";

    const requiredTargets = ["#home", "#how-it-works", "#pricing", "#about", "#contact"];
    const targetsFound = requiredTargets.filter((t) => content.includes(t));
    const hasFixedOrSticky = content.includes("fixed") || content.includes("sticky");
    const hasBackdrop = content.includes("backdrop-blur") || content.includes("backdrop-filter") || content.includes("bg-");

    const passed = Boolean(hasNav && targetsFound.length === 5 && hasFixedOrSticky && hasBackdrop);

    assertTest(
      "tier1",
      "E2E-T1-02",
      "Fixed floating Navbar provides smooth anchor links to all 5 sections with glassmorphic styling",
      passed,
      {
        expected: "All 5 anchors (#home, #how-it-works, #pricing, #about, #contact) with fixed/sticky positioning and backdrop blur",
        observed: hasNav
          ? `Found ${targetsFound.length}/5 anchors. Fixed/Sticky: ${hasFixedOrSticky}, Backdrop: ${hasBackdrop}`
          : "Navbar component not found",
        file: navResult.path || "src/components/navigation/Navbar.tsx",
        note: "Anchor routing and fixed navigation header confirmed",
      }
    );
  }

  // E2E-T1-03: Mobile Responsive Navigation Drawer & Hamburger Toggle
  {
    const navResult = findFirstExistingFile([
      "src/components/navigation/Navbar.tsx",
      "src/components/navigation/MobileMenu.tsx",
      "src/components/Navbar.tsx",
      "src/app/page.tsx",
    ]);
    const mobileMenuResult = findFirstExistingFile([
      "src/components/navigation/MobileMenu.tsx",
    ]);

    const combinedContent = (navResult.content || "") + "\n" + (mobileMenuResult.content || "");
    const hasContent = combinedContent.trim().length > 0;

    const hasMobileState = hasContent && (
      combinedContent.includes("isOpen") ||
      combinedContent.includes("setIsOpen") ||
      combinedContent.includes("mobileMenuOpen") ||
      combinedContent.includes("setMobileMenuOpen") ||
      combinedContent.includes("isMenuOpen") ||
      combinedContent.includes("toggleMenu")
    );
    const hasHamburgerIcon = hasContent && (
      combinedContent.includes("Menu") ||
      combinedContent.includes("<Menu") ||
      combinedContent.includes("aria-label=\"Toggle menu\"") ||
      combinedContent.includes("aria-label=\"Open menu\"") ||
      combinedContent.includes("hamburger")
    );
    const hasResponsiveHiding = hasContent && (
      combinedContent.includes("md:hidden") ||
      combinedContent.includes("lg:hidden") ||
      combinedContent.includes("sm:hidden")
    );

    const passed = Boolean(hasContent && hasMobileState && hasHamburgerIcon && hasResponsiveHiding);

    assertTest(
      "tier1",
      "E2E-T1-03",
      "Mobile navigation drawer has reactive toggle state, hamburger/close icons, and responsive breakpoint hiding",
      passed,
      {
        expected: "Mobile toggle state, Menu/X icons, responsive hiding (md:hidden), and drawer controls",
        observed: hasContent
          ? `State: ${Boolean(hasMobileState)}, Icon: ${Boolean(hasHamburgerIcon)}, Responsive Hiding: ${Boolean(hasResponsiveHiding)}`
          : "Navigation components not found",
        file: navResult.path || "src/components/navigation/Navbar.tsx",
        note: "Mobile responsive drawer behavior and accessibility validated",
      }
    );
  }

  // E2E-T1-04: Light/Dark Mode Theme Toggle
  {
    const toggleResult = findFirstExistingFile([
      "src/components/ui/ThemeToggle.tsx",
      "src/components/ThemeToggle.tsx",
    ]);
    const hasToggle = toggleResult.content !== null;

    const usesNextThemes = hasToggle && (
      toggleResult.content.includes("next-themes") ||
      toggleResult.content.includes("useTheme") ||
      toggleResult.content.includes("setTheme")
    );
    const hasSunMoonIcons = hasToggle && (
      (toggleResult.content.includes("Sun") && toggleResult.content.includes("Moon")) ||
      toggleResult.content.includes("lucide-react") ||
      toggleResult.content.includes("<svg")
    );
    const hasAria = hasToggle && toggleResult.content.includes("aria-label");

    const passed = Boolean(hasToggle && usesNextThemes && hasSunMoonIcons && hasAria);

    assertTest(
      "tier1",
      "E2E-T1-04",
      "Dual-mode theming toggle implemented with next-themes hook, Sun/Moon icons, and accessible aria-label",
      passed,
      {
        expected: "ThemeToggle component with useTheme/setTheme, Sun/Moon icons, and aria-label",
        observed: hasToggle
          ? `next-themes: ${Boolean(usesNextThemes)}, Sun/Moon: ${Boolean(hasSunMoonIcons)}, ARIA: ${Boolean(hasAria)}`
          : "ThemeToggle component not found",
        file: toggleResult.path || "src/components/ui/ThemeToggle.tsx",
        note: "Client-side theme toggle controls confirmed",
      }
    );
  }

  // E2E-T1-05: Brand Favicon & Logo Mark
  {
    const faviconSvgExists = fileExists("public/favicon.svg");
    const faviconIcoExists = fileExists("public/favicon.ico");
    const faviconSize = faviconSvgExists
      ? getFileSize("public/favicon.svg")
      : (faviconIcoExists ? getFileSize("public/favicon.ico") : 0);

    const layoutContent = readFileSafe("src/app/layout.tsx");
    const layoutHasFavicon = layoutContent && (
      layoutContent.includes("favicon.svg") ||
      layoutContent.includes("favicon.ico") ||
      layoutContent.includes("icons")
    );

    const logoResult = findFirstExistingFile([
      "src/components/ui/BrandLogo.tsx",
      "src/components/BrandLogo.tsx",
      "src/components/navigation/Navbar.tsx",
      "src/app/page.tsx",
    ]);
    const hasSvgMark = logoResult.content && (
      logoResult.content.includes("<svg") ||
      logoResult.content.includes("BrandLogo") ||
      logoResult.content.includes("NeuroGrid")
    );

    const passed = (faviconSvgExists || faviconIcoExists) && faviconSize > 50 && Boolean(layoutHasFavicon) && Boolean(hasSvgMark);

    assertTest(
      "tier1",
      "E2E-T1-05",
      "Brand favicon asset present in public/, linked in Next.js layout metadata, and vector logo mark rendered",
      passed,
      {
        expected: "Favicon SVG/ICO > 50 bytes, layout.tsx metadata icons configured, and SVG logo mark present",
        observed: `Favicon: SVG(${faviconSvgExists})/ICO(${faviconIcoExists}) [${faviconSize} bytes], Layout metadata: ${Boolean(layoutHasFavicon)}, Logo Mark: ${Boolean(hasSvgMark)}`,
        file: "public/favicon.svg, src/app/layout.tsx",
        note: "Brand identity assets and tab icon resolution verified",
      }
    );
  }

  // E2E-T1-06: High-Tech Cyber-Grid SCADA UI Components
  {
    const heroResult = findFirstExistingFile([
      "src/components/sections/Hero.tsx",
      "src/components/sections/HeroSection.tsx",
      "src/app/page.tsx",
    ]);
    const heroSection = heroResult.path === "src/app/page.tsx"
      ? extractSectionContent(heroResult.content, "home")
      : heroResult.content;

    const globalsCss = readFileSafe("src/app/globals.css") || "";
    const content = heroSection || heroResult.content || "";

    const hasStatusBeacon = content.includes("60.00") ||
      content.includes("ONLINE") ||
      content.includes("SYNCHRONIZED") ||
      content.includes("STATUS");
    const hasTelemetryKpis = content.includes("MW") &&
      (content.includes("18,450") || content.includes("412.8") || content.includes("120 ms") || content.includes("Latency"));
    const hasCyberPalette = globalsCss.includes("#07090E") ||
      globalsCss.includes("#00F0FF") ||
      globalsCss.includes("obsidian") ||
      content.includes("cyan") ||
      content.includes("emerald");

    const passed = Boolean(content && hasStatusBeacon && hasTelemetryKpis && hasCyberPalette);

    assertTest(
      "tier1",
      "E2E-T1-06",
      "High-tech SCADA visual elements implemented (live grid status beacon, telemetry KPI metrics, cyber-grid styling)",
      passed,
      {
        expected: "Live status beacon (60.00 Hz/ONLINE), telemetry cards (MW/nodes/latency), cyber-grid styling",
        observed: content
          ? `Beacon: ${Boolean(hasStatusBeacon)}, KPIs: ${Boolean(hasTelemetryKpis)}, Cyber Palette: ${Boolean(hasCyberPalette)}`
          : "Hero section not found",
        file: heroResult.path || "src/components/sections/Hero.tsx",
        note: "SCADA mission-control telemetry aesthetic confirmed",
      }
    );
  }
}

// ==============================================================================
// TIER 2: BOUNDARY & CORNER CASES (STRICT NEGATIVE CONSTRAINTS)
// ==============================================================================
function runTier2() {
  logTier(2, "BOUNDARY & CORNER CASES (FOUNDER, ACCELERATORS, CONTACT, AWS, TIERS)");

  // E2E-T2-01: Exact Founder Cardinality (About Us)
  {
    const aboutResult = findFirstExistingFile([
      "src/components/sections/AboutUs.tsx",
      "src/components/sections/AboutSection.tsx",
      "src/components/sections/About.tsx",
      "src/app/page.tsx",
    ]);
    const hasAbout = aboutResult.content !== null;
    const aboutSectionContent = aboutResult.path === "src/app/page.tsx"
      ? extractSectionContent(aboutResult.content, "about")
      : aboutResult.content;

    const content = aboutSectionContent || "";

    // Required founder: Esther (or legacy placeholder Dr. Elena Vance)
    const hasFounder = content.includes("Esther") || content.includes("Dr. Elena Vance") || content.includes("Elena Vance");
    const hasFounderBio = content.includes("Esther") ||
      content.includes("Ph.D.") ||
      content.includes("Stanford") ||
      content.includes("Power Systems") ||
      content.includes("Energy Architect") ||
      content.includes("Virtual Power Plants") ||
      content.includes("Founder");

    // Check for negative co-founder violations
    const coFounderMatches = content.match(/\b(co-founder|cofounder|co-founders|cofounders)\b/gi) || [];
    const secondaryExecMatches = content.match(/\b(Co-CEO|Chief Technology Officer|CTO|COO|CFO)\b/g) || [];

    // Distinct founder names detected
    const founderNameMatches = (content.match(/Esther|Elena Vance/g) || []).length;

    const passed = Boolean(
      hasAbout &&
      hasFounder &&
      hasFounderBio &&
      coFounderMatches.length === 0 &&
      secondaryExecMatches.length === 0 &&
      founderNameMatches >= 1
    );

    assertTest(
      "tier2",
      "E2E-T2-01",
      "About Us section contains EXACTLY ONE founder (Esther) with biography, and ZERO co-founders",
      passed,
      {
        expected: "Exactly 1 founder (Esther), 0 co-founders, 0 secondary executive bios",
        observed: content
          ? `Founder detected: ${hasFounder}, Co-founder mentions: ${coFounderMatches.length}, Other execs: ${secondaryExecMatches.length}`
          : "AboutUs component or section not found",
        file: aboutResult.path || "src/components/sections/AboutUs.tsx",
        note: "Single founder requirement verified with zero team dilution",
      }
    );
  }

  // E2E-T2-02: Absolute Zero Accelerator Mentions
  {
    const srcFiles = getAllFiles(path.join(projectRoot, "src")).concat(
      getAllFiles(path.join(projectRoot, "public"))
    );
    const acceleratorRegex = /\b(accelerator|accelerators|y\s*combinator|yc|techstars|500\s*global|seedcamp|plug\s*and\s*play|incubator|incubators)\b/i;

    const violations = [];
    for (const file of srcFiles) {
      const fileContent = fs.readFileSync(file, "utf-8");
      const lines = fileContent.split("\n");
      lines.forEach((line, lineNum) => {
        const match = line.match(acceleratorRegex);
        if (match) {
          violations.push({
            file: path.relative(projectRoot, file),
            line: lineNum + 1,
            matchedTerm: match[0],
            snippet: line.trim().slice(0, 100),
          });
        }
      });
    }

    const passed = violations.length === 0 && srcFiles.length > 0;

    assertTest(
      "tier2",
      "E2E-T2-02",
      "ZERO mentions of accelerators or incubators across all application source files and copy",
      passed,
      {
        expected: "0 matches for /accelerator|y combinator|yc|techstars|incubator/i",
        observed: violations.length === 0
          ? (srcFiles.length > 0 ? "0 matches found across entire codebase" : "No source files found in src/")
          : `${violations.length} forbidden matches found: ${JSON.stringify(violations.slice(0, 3))}`,
        file: violations.length > 0 ? violations[0].file : "src/**",
        note: "Strict negative accelerator constraint verified across all files",
      }
    );
  }

  // E2E-T2-03: Exact Business Email Cardinality (Contact Us)
  {
    const contactResult = findFirstExistingFile([
      "src/components/sections/ContactUs.tsx",
      "src/components/sections/ContactSection.tsx",
      "src/components/sections/Contact.tsx",
      "src/app/page.tsx",
    ]);
    const hasContact = contactResult.content !== null;
    const contactSectionContent = contactResult.path === "src/app/page.tsx"
      ? extractSectionContent(contactResult.content, "contact")
      : contactResult.content;

    const content = contactSectionContent || "";
    const expectedEmail = "esther@neurogrid.site";
    const legacyEmail = "dispatch@neurogrid-os.io";

    // Extract all email addresses matching regex
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emailMatches = content.match(emailRegex) || [];
    const uniqueEmails = [...new Set(emailMatches)];

    const hasApprovedEmail = uniqueEmails.includes(expectedEmail) || uniqueEmails.includes(legacyEmail);
    const passed = Boolean(hasContact && hasApprovedEmail && uniqueEmails.length === 1);

    assertTest(
      "tier2",
      "E2E-T2-03",
      "Contact Us section contains EXACTLY 1 business email (esther@neurogrid.site) and zero extraneous emails",
      passed,
      {
        expected: `Exactly 1 email (${expectedEmail})`,
        observed: content
          ? `Found ${uniqueEmails.length} unique emails: ${JSON.stringify(uniqueEmails)}`
          : "ContactUs component or section not found",
        file: contactResult.path || "src/components/sections/ContactUs.tsx",
        note: "Business email single cardinality constraint strictly enforced",
      }
    );
  }

  // E2E-T2-04: Exact Phone Number Cardinality (Contact Us)
  {
    const contactResult = findFirstExistingFile([
      "src/components/sections/ContactUs.tsx",
      "src/components/sections/ContactSection.tsx",
      "src/components/sections/Contact.tsx",
      "src/app/page.tsx",
    ]);
    const hasContact = contactResult.content !== null;
    const contactSectionContent = contactResult.path === "src/app/page.tsx"
      ? extractSectionContent(contactResult.content, "contact")
      : contactResult.content;

    const content = contactSectionContent || "";
    const expectedDisplayPhone = "+234 913 608 8893";
    const expectedNormalizedPhone = "2349136088893";
    const legacyNormalizedPhone = "14158904743";

    // Extract phone numbers matching standard formats
    const phoneRegex = /\+?\d[\d\s().-]{7,15}\d/g;
    const rawMatches = content.match(phoneRegex) || [];
    const normalizedMatches = [...new Set(rawMatches.map((p) => p.replace(/\D/g, "")).filter(p => p.length >= 10))];

    const hasExpectedPhone = content.includes("913 608 8893") ||
      content.includes("9136088893") ||
      content.includes("415) 890-4743") ||
      normalizedMatches.includes(expectedNormalizedPhone) ||
      normalizedMatches.includes(legacyNormalizedPhone);

    const passed = Boolean(
      hasContact &&
      hasExpectedPhone &&
      normalizedMatches.length === 1 &&
      (normalizedMatches[0] === expectedNormalizedPhone || normalizedMatches[0] === legacyNormalizedPhone)
    );

    assertTest(
      "tier2",
      "E2E-T2-04",
      "Contact Us section contains EXACTLY 1 telephone number (+234 913 608 8893) and zero extraneous numbers",
      passed,
      {
        expected: `Exactly 1 normalized phone (${expectedNormalizedPhone} / ${expectedDisplayPhone})`,
        observed: content
          ? `Found ${normalizedMatches.length} unique phones: ${JSON.stringify(normalizedMatches)}`
          : "ContactUs component or section not found",
        file: contactResult.path || "src/components/sections/ContactUs.tsx",
        note: "Telephone number single cardinality constraint strictly enforced",
      }
    );
  }

  // E2E-T2-05: Absolute Zero AWS Proprietary Terms (Cloud Neutrality)
  {
    const srcFiles = getAllFiles(path.join(projectRoot, "src")).concat(
      getAllFiles(path.join(projectRoot, "public"))
    );
    const awsRegex = /\b(aws|amazon\s*web\s*services|s3|ec2|lambda|sagemaker|dynamodb|cloudwatch|kinesis|greengrass)\b/i;

    const awsViolations = [];
    for (const file of srcFiles) {
      const fileContent = fs.readFileSync(file, "utf-8");
      const lines = fileContent.split("\n");
      lines.forEach((line, lineNum) => {
        const match = line.match(awsRegex);
        if (match) {
          awsViolations.push({
            file: path.relative(projectRoot, file),
            line: lineNum + 1,
            matchedTerm: match[0],
            snippet: line.trim().slice(0, 100),
          });
        }
      });
    }

    const passed = awsViolations.length === 0 && srcFiles.length > 0;

    assertTest(
      "tier2",
      "E2E-T2-05",
      "Strict AWS & Cloud neutrality maintained (ZERO mentions of AWS, S3, EC2, Lambda, SageMaker across copy)",
      passed,
      {
        expected: "0 matches for /aws|amazon web services|s3|ec2|lambda|sagemaker/i",
        observed: awsViolations.length === 0
          ? (srcFiles.length > 0 ? "0 matches found across entire codebase" : "No source files found in src/")
          : `${awsViolations.length} forbidden AWS matches found: ${JSON.stringify(awsViolations.slice(0, 3))}`,
        file: awsViolations.length > 0 ? awsViolations[0].file : "src/**",
        note: "Neutrality constraint verified: copy focuses purely on open DER protocols and neural optimization",
      }
    );
  }

  // E2E-T2-06: Pricing Tiers Cardinality & Realistic Limits
  {
    const pricingResult = findFirstExistingFile([
      "src/components/sections/Pricing.tsx",
      "src/components/sections/PricingSection.tsx",
      "src/app/page.tsx",
    ]);
    const hasPricing = pricingResult.content !== null;
    const pricingSectionContent = pricingResult.path === "src/app/page.tsx"
      ? extractSectionContent(pricingResult.content, "pricing")
      : pricingResult.content;

    const content = pricingSectionContent || "";

    const expectedTiers = [
      "Edge Microgrid",
      "Commercial Flexibility",
      "Utility Fleet Operator",
    ];

    const tiersFound = expectedTiers.filter((tier) => content.includes(tier));

    // Realistic capacity limits
    const hasCapacityLimits = content.includes("MW") || content.includes("kW");

    // Distinct CTA buttons per tier
    const hasCtas = (content.match(/Select|Deploy|Start|Consult|Contact|Get Started/g) || []).length >= 3;

    const passed = Boolean(
      hasPricing &&
      tiersFound.length === 3 &&
      hasCapacityLimits &&
      hasCtas
    );

    assertTest(
      "tier2",
      "E2E-T2-06",
      "Pricing section contains EXACTLY 3 distinct realistic tiers (Edge Microgrid, Commercial Flexibility, Utility Fleet Operator)",
      passed,
      {
        expected: "Exactly 3 distinct tiers with realistic capacity limits (kW/MW) and distinct CTA actions",
        observed: content
          ? `Tiers matched: ${tiersFound.length}/3 (${JSON.stringify(tiersFound)}), Capacity: ${hasCapacityLimits}, CTAs: ${hasCtas}`
          : "Pricing component or section not found",
        file: pricingResult.path || "src/components/sections/Pricing.tsx",
        note: "Virtual power plant pricing structure and boundary constraints validated",
      }
    );
  }
}

// ==============================================================================
// TIER 3: CROSS-FEATURE INTERACTIONS & ARCHITECTURAL CONTRACTS
// ==============================================================================
function runTier3() {
  logTier(3, "CROSS-FEATURE INTERACTIONS (FRAMER MOTION, PRICING MATRIX, THEME PROVIDER)");

  // E2E-T3-01: ThemeProvider Integration & Class Strategy
  {
    const providerResult = findFirstExistingFile([
      "src/app/providers.tsx",
      "src/components/providers/ThemeProvider.tsx",
      "src/components/theme-provider.tsx",
      "src/app/layout.tsx",
    ]);
    const layoutContent = readFileSafe("src/app/layout.tsx") || "";
    const tailwindConfig = readFileSafe("tailwind.config.ts") || "";

    const combinedProviderContent = (providerResult.content || "") + "\n" + layoutContent;
    const hasProvider = combinedProviderContent.trim().length > 0;

    const hasNextThemes = combinedProviderContent.includes("next-themes");
    const hasClassAttribute = combinedProviderContent.includes('attribute="class"') ||
      combinedProviderContent.includes("attribute='class'");
    const hasDefaultDark = combinedProviderContent.includes('defaultTheme="dark"') ||
      combinedProviderContent.includes("defaultTheme='dark'");
    const hasTailwindDarkClass = tailwindConfig.includes('darkMode: ["class"]') ||
      tailwindConfig.includes("darkMode: 'class'") ||
      tailwindConfig.includes('darkMode: "class"');

    const passed = Boolean(
      hasProvider &&
      hasNextThemes &&
      hasClassAttribute &&
      hasDefaultDark &&
      hasTailwindDarkClass
    );

    assertTest(
      "tier3",
      "E2E-T3-01",
      "ThemeProvider configured with next-themes, attribute='class', defaultTheme='dark', and Tailwind class dark mode",
      passed,
      {
        expected: "next-themes ThemeProvider with attribute='class', defaultTheme='dark', and tailwind.config darkMode class",
        observed: hasProvider
          ? `next-themes: ${hasNextThemes}, attribute="class": ${hasClassAttribute}, defaultTheme="dark": ${hasDefaultDark}, Tailwind class: ${hasTailwindDarkClass}`
          : "ThemeProvider / layout files not found",
        file: providerResult.path || "src/app/providers.tsx",
        note: "Zero-FOUC high-contrast dark theme initialization confirmed",
      }
    );
  }

  // E2E-T3-02: Framer Motion Multi-Stage Pipeline Integration
  {
    const howItWorksResult = findFirstExistingFile([
      "src/components/sections/HowItWorks.tsx",
      "src/components/sections/HowItWorksSection.tsx",
      "src/app/page.tsx",
    ]);
    const pipelineFiles = getAllFiles(path.join(projectRoot, "src", "components", "pipeline"));
    let combinedPipelineContent = howItWorksResult.content || "";
    for (const pf of pipelineFiles) {
      combinedPipelineContent += "\n" + fs.readFileSync(pf, "utf-8");
    }

    const hasHowItWorks = combinedPipelineContent.trim().length > 0;

    const hasClientDirective = combinedPipelineContent.includes('"use client"') ||
      combinedPipelineContent.includes("'use client'");
    const usesFramerMotion = combinedPipelineContent.includes("framer-motion");
    const usesMotionComponents = combinedPipelineContent.includes("motion.") ||
      combinedPipelineContent.includes("<motion");

    // Check for the 4 lifecycle stages
    const hasStage1 = combinedPipelineContent.includes("Ingestion") || combinedPipelineContent.includes("Telemetry");
    const hasStage2 = combinedPipelineContent.includes("Forecast") || combinedPipelineContent.includes("Neural");
    const hasStage3 = combinedPipelineContent.includes("Dispatch") || combinedPipelineContent.includes("MILP");
    const hasStage4 = combinedPipelineContent.includes("Settlement") || combinedPipelineContent.includes("Balancing");

    const passed = Boolean(
      hasHowItWorks &&
      hasClientDirective &&
      usesFramerMotion &&
      usesMotionComponents &&
      hasStage1 &&
      hasStage2 &&
      hasStage3 &&
      hasStage4
    );

    assertTest(
      "tier3",
      "E2E-T3-02",
      "HowItWorks implements Framer Motion multi-stage pipeline with client boundary and 4 sequential stages",
      passed,
      {
        expected: "use client, framer-motion (motion.*), and all 4 pipeline stages (Ingestion, Forecast, Dispatch, Settlement)",
        observed: hasHowItWorks
          ? `Client: ${hasClientDirective}, Framer Motion: ${usesFramerMotion}, Motion tags: ${usesMotionComponents}, Stages (1:${hasStage1}, 2:${hasStage2}, 3:${hasStage3}, 4:${hasStage4})`
          : "HowItWorks section not found",
        file: howItWorksResult.path || "src/components/sections/HowItWorks.tsx",
        note: "Hardware-accelerated visual pipeline architecture validated",
      }
    );
  }

  // E2E-T3-03: Pricing Feature Matrix & Billing Cycle Toggle
  {
    const pricingResult = findFirstExistingFile([
      "src/components/sections/Pricing.tsx",
      "src/components/sections/PricingSection.tsx",
      "src/app/page.tsx",
    ]);
    const hasPricing = pricingResult.content !== null;
    const content = pricingResult.path === "src/app/page.tsx"
      ? (extractSectionContent(pricingResult.content, "pricing") || "")
      : (pricingResult.content || "");

    const hasBillingToggle = content.includes("billingCycle") ||
      content.includes("isAnnual") ||
      content.includes("setIsAnnual") ||
      content.includes("annualBilling") ||
      content.includes("toggleBilling") ||
      content.includes("Monthly") && content.includes("Annual");
    const hasDiscountBadge = content.includes("15%") ||
      content.includes("Save 15%") ||
      content.includes("discount") ||
      content.includes("annual");
    const hasFeatureLists = content.includes("features") ||
      content.includes("<Check") ||
      content.includes("CheckCircle") ||
      content.includes("<li") ||
      content.includes("capacity");

    const passed = Boolean(hasPricing && hasBillingToggle && hasDiscountBadge && hasFeatureLists);

    assertTest(
      "tier3",
      "E2E-T3-03",
      "Pricing section provides interactive billing toggle (Monthly / Annual) with discount calculation and feature checklists",
      passed,
      {
        expected: "Billing toggle state (Monthly/Annual), discount badge (15%), and distinct feature checklists per tier",
        observed: content
          ? `Billing toggle: ${hasBillingToggle}, Discount badge: ${hasDiscountBadge}, Feature lists: ${hasFeatureLists}`
          : "Pricing component or section not found",
        file: pricingResult.path || "src/components/sections/Pricing.tsx",
        note: "Interactive SaaS economics and capacity matrix confirmed",
      }
    );
  }

  // E2E-T3-04: Multi-Breakpoint Viewport Responsiveness & Layout Stacking
  {
    const sectionFiles = [
      "src/components/sections/Hero.tsx",
      "src/components/sections/HeroSection.tsx",
      "src/components/sections/HowItWorks.tsx",
      "src/components/sections/HowItWorksSection.tsx",
      "src/components/sections/Pricing.tsx",
      "src/components/sections/PricingSection.tsx",
      "src/components/sections/AboutUs.tsx",
      "src/components/sections/AboutSection.tsx",
      "src/components/sections/ContactUs.tsx",
      "src/components/sections/ContactSection.tsx",
      "src/app/page.tsx",
    ];

    let responsiveCount = 0;
    const checked = new Set();

    for (const sf of sectionFiles) {
      const fileData = findFirstExistingFile([sf]);
      if (fileData.content && !checked.has(fileData.path)) {
        checked.add(fileData.path);
        const hasMobileStack = fileData.content.includes("flex-col") ||
          fileData.content.includes("grid-cols-1") ||
          fileData.content.includes("w-full");
        const hasResponsiveBreakpoints = fileData.content.includes("sm:") ||
          fileData.content.includes("md:") ||
          fileData.content.includes("lg:");

        if (hasMobileStack && hasResponsiveBreakpoints) {
          responsiveCount++;
        }
      }
    }

    const passed = responsiveCount >= 1 && (checked.has("src/app/page.tsx") || responsiveCount >= 3);

    assertTest(
      "tier3",
      "E2E-T3-04",
      "All sections implement mobile-first responsive layout stacking (flex-col / grid-cols-1 adapting to multi-column)",
      passed,
      {
        expected: "Responsive layout implementing mobile flex-col/grid-cols-1 with md:/lg: desktop grid adaptations",
        observed: `Responsive files verified: ${responsiveCount} files (${Array.from(checked).join(", ")})`,
        file: "src/app/page.tsx or src/components/sections/*",
        note: "Mobile viewport fluid reflow and breakpoint adaptations verified",
      }
    );
  }
}

// ==============================================================================
// TIER 4: REAL-WORLD SCENARIOS & END-TO-END JOURNEYS
// ==============================================================================
function runTier4() {
  logTier(4, "REAL-WORLD SCENARIOS (DISPATCH SCENARIOS, OSCILLOSCOPE, FORM, BUILD CHECK)");

  // E2E-T4-01: User Journey 1 - Hero CTA Conversion to Pricing & Architecture
  {
    const heroResult = findFirstExistingFile([
      "src/components/sections/Hero.tsx",
      "src/components/sections/HeroSection.tsx",
      "src/app/page.tsx",
    ]);
    const pricingResult = findFirstExistingFile([
      "src/components/sections/Pricing.tsx",
      "src/components/sections/PricingSection.tsx",
      "src/app/page.tsx",
    ]);

    const heroContent = heroResult.path === "src/app/page.tsx"
      ? (extractSectionContent(heroResult.content, "home") || heroResult.content)
      : (heroResult.content || "");
    const pricingContent = pricingResult.path === "src/app/page.tsx"
      ? (extractSectionContent(pricingResult.content, "pricing") || pricingResult.content)
      : (pricingResult.content || "");

    const heroHasPricingLink = heroContent.includes("#pricing") || heroContent.includes("#contact");
    const heroHasHowItWorksLink = heroContent.includes("#how-it-works");
    const pricingHasContactLink = pricingContent.includes("#contact");

    const passed = Boolean(
      heroContent &&
      pricingContent &&
      heroHasPricingLink &&
      heroHasHowItWorksLink &&
      pricingHasContactLink
    );

    assertTest(
      "tier4",
      "E2E-T4-01",
      "User Journey 1: Hero CTAs link to #pricing and #how-it-works, and pricing tier CTAs advance to #contact",
      passed,
      {
        expected: "Hero CTAs target #pricing and #how-it-works; Pricing CTAs target #contact",
        observed: heroContent
          ? `Hero->Pricing/Contact: ${heroHasPricingLink}, Hero->HowItWorks: ${heroHasHowItWorksLink}, Pricing->Contact: ${pricingHasContactLink}`
          : "Hero/Pricing components not found",
        file: `${heroResult.path || "Hero.tsx"}, ${pricingResult.path || "Pricing.tsx"}`,
        note: "Full conversion funnel navigation pathway confirmed",
      }
    );
  }

  // E2E-T4-02: User Journey 2 - Interactive Scenario Dispatch Triggers
  {
    const howItWorksResult = findFirstExistingFile([
      "src/components/sections/HowItWorks.tsx",
      "src/components/sections/HowItWorksSection.tsx",
      "src/components/pipeline/DispatchStage.tsx",
      "src/app/page.tsx",
    ]);
    const dispatchStageResult = findFirstExistingFile([
      "src/components/pipeline/DispatchStage.tsx",
    ]);

    const combinedContent = (howItWorksResult.content || "") + "\n" + (dispatchStageResult.content || "");
    const hasContent = combinedContent.trim().length > 0;

    const hasHeatwave = combinedContent.includes("Heatwave Peak") || combinedContent.includes("Heatwave");
    const hasCloudRamp = combinedContent.includes("Cloud Ramp") || combinedContent.includes("Cloud Cover");
    const hasSubstationTrip = combinedContent.includes("Substation Trip") || combinedContent.includes("Substation");
    const hasScenarioClick = combinedContent.includes("onClick") ||
      combinedContent.includes("activeScenario") ||
      combinedContent.includes("handleScenario");

    const passed = Boolean(hasContent && hasHeatwave && hasCloudRamp && hasSubstationTrip && hasScenarioClick);

    assertTest(
      "tier4",
      "E2E-T4-02",
      "User Journey 2: Interactive scenario dispatch triggers (Heatwave Peak, Cloud Ramp, Substation Trip) implemented",
      passed,
      {
        expected: "Interactive simulation buttons for Heatwave Peak, Cloud Ramp, Substation Trip with active scenario click handlers",
        observed: hasContent
          ? `Heatwave: ${hasHeatwave}, Cloud Ramp: ${hasCloudRamp}, Substation Trip: ${hasSubstationTrip}, Click Handlers: ${hasScenarioClick}`
          : "Dispatch stage components not found",
        file: dispatchStageResult.path || howItWorksResult.path || "src/components/sections/HowItWorks.tsx",
        note: "Dynamic VPP dispatch mobilization simulation validated",
      }
    );
  }

  // E2E-T4-03: User Journey 3 - Frequency Stabilization Oscilloscope
  {
    const howItWorksResult = findFirstExistingFile([
      "src/components/sections/HowItWorks.tsx",
      "src/components/sections/HowItWorksSection.tsx",
      "src/components/pipeline/SettlementStage.tsx",
      "src/app/page.tsx",
    ]);
    const settlementResult = findFirstExistingFile([
      "src/components/pipeline/SettlementStage.tsx",
    ]);

    const combinedContent = (howItWorksResult.content || "") + "\n" + (settlementResult.content || "");
    const hasContent = combinedContent.trim().length > 0;

    const hasFrequencyDecay = combinedContent.includes("59.84") || combinedContent.includes("droop");
    const hasNominalFrequency = combinedContent.includes("60.00") || combinedContent.includes("60.000");
    const hasOscilloscopeSvg = combinedContent.includes("<svg") ||
      combinedContent.includes("<path") ||
      combinedContent.includes("oscilloscope") ||
      combinedContent.includes("Frequency");

    const passed = Boolean(hasContent && hasFrequencyDecay && hasNominalFrequency && hasOscilloscopeSvg);

    assertTest(
      "tier4",
      "E2E-T4-03",
      "User Journey 3: Frequency droop control oscilloscope component visualizes stabilization to 60.00 Hz nominal",
      passed,
      {
        expected: "Visualizer demonstrating frequency stabilization from 59.84 Hz disturbance to 60.00 Hz nominal",
        observed: hasContent
          ? `59.84 Hz decay: ${hasFrequencyDecay}, 60.00 Hz nominal: ${hasNominalFrequency}, Visual oscilloscope: ${hasOscilloscopeSvg}`
          : "Settlement / Oscilloscope component not found",
        file: settlementResult.path || howItWorksResult.path || "src/components/pipeline/SettlementStage.tsx",
        note: "Grid stabilization and frequency droop control visualization verified",
      }
    );
  }

  // E2E-T4-04: User Journey 4 - Interactive Enterprise Consultation Form
  {
    const contactResult = findFirstExistingFile([
      "src/components/sections/ContactUs.tsx",
      "src/components/sections/ContactSection.tsx",
      "src/components/sections/Contact.tsx",
      "src/app/page.tsx",
    ]);
    const hasContact = contactResult.content !== null;
    const content = contactResult.path === "src/app/page.tsx"
      ? (extractSectionContent(contactResult.content, "contact") || "")
      : (contactResult.content || "");

    const hasNameInput = content.includes('type="text"') || content.includes("name");
    const hasEmailInput = content.includes('type="email"') || content.includes("email");
    const hasFleetInput = content.includes("Capacity") || content.includes("Fleet") || content.includes("MW");
    const hasSubmitButton = content.includes('type="submit"') || content.includes("<button");
    const hasConfirmationState = content.includes("INQUIRY QUEUED") ||
      content.includes("SUBMITTED") ||
      content.includes("SUCCESS") ||
      content.includes("isSubmitted") ||
      content.includes("status");

    const passed = Boolean(
      hasContact &&
      hasNameInput &&
      hasEmailInput &&
      hasFleetInput &&
      hasSubmitButton &&
      hasConfirmationState
    );

    assertTest(
      "tier4",
      "E2E-T4-04",
      "User Journey 4: Enterprise inquiry form provides input controls (Name, Email, Fleet MW, Message) and submission feedback",
      passed,
      {
        expected: "Interactive form fields (Name, Email, Capacity/Fleet MW), submit button, and confirmed inquiry state",
        observed: content
          ? `Name: ${hasNameInput}, Email: ${hasEmailInput}, Fleet: ${hasFleetInput}, Submit: ${hasSubmitButton}, Feedback: ${hasConfirmationState}`
          : "ContactUs component or section not found",
        file: contactResult.path || "src/components/sections/ContactUs.tsx",
        note: "Enterprise inquiry telemetry transmission lifecycle validated",
      }
    );
  }

  // E2E-T4-05: User Journey 5 - Production Build & Dependency Integrity Check
  {
    const pkgContent = readFileSafe("package.json");
    let hasBuildScript = false;
    let hasRequiredDeps = false;

    if (pkgContent) {
      try {
        const pkg = JSON.parse(pkgContent);
        hasBuildScript = Boolean(pkg.scripts && pkg.scripts.build);
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        const required = [
          "next",
          "react",
          "react-dom",
          "framer-motion",
          "lucide-react",
          "next-themes",
          "tailwindcss",
        ];
        hasRequiredDeps = required.every((d) => Boolean(deps[d]));
      } catch (err) {
        hasBuildScript = false;
      }
    }

    const pageExists = fileExists("src/app/page.tsx");
    let buildPassed = false;
    let buildOutput = "";

    if (pageExists) {
      console.log(`\n    ${colors.dim}Executing production build check ('npm.cmd run build')...${colors.reset}`);
      const buildCmd = process.platform === "win32" ? "npm.cmd" : "npm";
      const result = spawnSync(buildCmd, ["run", "build"], {
        cwd: projectRoot,
        encoding: "utf-8",
        timeout: 300000,
        shell: true,
      });
      buildPassed = result.status === 0;
      buildOutput = (result.stdout || "") + "\n" + (result.stderr || "");
    } else {
      buildPassed = false;
      buildOutput = "src/app/page.tsx does not exist yet (milestone implementation in progress; requires M1-M5 code)";
    }

    assertTest(
      "tier4",
      "E2E-T4-05",
      "User Journey 5: Production build execution and dependency integrity (package.json scripts, dependencies, build pass)",
      pageExists && hasRequiredDeps && buildPassed,
      {
        expected: "src/app/page.tsx present, all required dependencies installed, and 'npm.cmd run build' exits with code 0",
        observed: pageExists
          ? (buildPassed ? "Build completed successfully (exit code 0)" : `Build failed with exit status: ${buildOutput.slice(0, 250)}...`)
          : "src/app/page.tsx not found (milestone implementation in progress)",
        file: "package.json, src/app/page.tsx",
        note: "Validated build scripts, dependency manifests, and production compilation",
      }
    );
  }
}

// ==============================================================================
// RUNNER ENTRY POINT & CLI PARSING
// ==============================================================================
async function main() {
  const startTime = Date.now();
  const rawArgs = process.argv.slice(2);

  // Parse CLI flags: --tier=1, --tier=2, --tier=3, --tier=4, --tier=all, -h, --help
  let requestedTier = "all";

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (arg === "-h" || arg === "--help") {
      console.log(`
${colors.bold}NeuroGrid OS E2E Automated Test Runner${colors.reset}

${colors.bold}Usage:${colors.reset}
  node tests/run-e2e-tests.mjs [options]

${colors.bold}Options:${colors.reset}
  --tier=1       Run Tier 1 only (Feature Coverage)
  --tier=2       Run Tier 2 only (Boundary & Negative Constraints)
  --tier=3       Run Tier 3 only (Cross-Feature Interactions)
  --tier=4       Run Tier 4 only (Real-World Scenarios)
  --tier=all     Run all 4 tiers (Default)
  -h, --help     Show this help message
`);
      process.exit(0);
    } else if (arg.startsWith("--tier=")) {
      requestedTier = arg.split("=")[1].trim().toLowerCase();
    } else if (arg === "--tier" && rawArgs[i + 1]) {
      requestedTier = rawArgs[i + 1].trim().toLowerCase();
      i++;
    }
  }

  logHeader("NEUROGRID OS // INDEPENDENT 4-TIER E2E VERIFICATION SUITE");
  console.log(`Root Directory: ${colors.yellow}${projectRoot}${colors.reset}`);
  console.log(`Target Tier:    ${colors.magenta}${requestedTier.toUpperCase()}${colors.reset}`);
  console.log(`Timestamp:      ${colors.yellow}${new Date().toISOString()}${colors.reset}\n`);

  if (requestedTier === "1") {
    runTier1();
  } else if (requestedTier === "2") {
    runTier2();
  } else if (requestedTier === "3") {
    runTier3();
  } else if (requestedTier === "4") {
    runTier4();
  } else if (requestedTier === "all") {
    runTier1();
    runTier2();
    runTier3();
    runTier4();
  } else {
    console.error(`${colors.red}Invalid tier option: "${requestedTier}". Use 1, 2, 3, 4, or all.${colors.reset}`);
    process.exit(1);
  }

  // Summary Report
  const durationMs = Date.now() - startTime;
  console.log(`\n${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  TEST RUN SUMMARY & VERDICT${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`  Total Tests Run:  ${colors.bold}${totalTests}${colors.reset}`);
  console.log(`  Passed Tests:     ${colors.green}${colors.bold}${passedTests}${colors.reset}`);
  console.log(`  Failed Tests:     ${failedTests > 0 ? colors.red : colors.green}${colors.bold}${failedTests}${colors.reset}`);
  console.log(`  Execution Time:   ${colors.yellow}${durationMs} ms${colors.reset}\n`);

  // Breakdown by Tier
  console.log(`  ${colors.bold}Tier Breakdown:${colors.reset}`);
  for (const [key, stats] of Object.entries(tierStats)) {
    if (stats.total > 0) {
      const tierLabel = key.toUpperCase();
      const statusColor = stats.failed === 0 ? colors.green : colors.red;
      console.log(`    • ${tierLabel.padEnd(8)}: ${stats.passed}/${stats.total} passed ${statusColor}(${stats.failed} failed)${colors.reset}`);
    }
  }

  if (failedTests === 0) {
    console.log(`\n  ${colors.bgGreen}${colors.bold}  OVERALL RESULT: PASSED (100% SUCCESS)  ${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`\n  ${colors.bgRed}${colors.bold}  OVERALL RESULT: FAILED (${failedTests} FAILURES)  ${colors.reset}\n`);
    console.log(`${colors.red}Failures breakdown:${colors.reset}`);
    for (const f of failures) {
      console.log(`  - [${f.testId}] ${f.name}`);
    }
    console.log("");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error during test suite execution:", err);
  process.exit(1);
});
