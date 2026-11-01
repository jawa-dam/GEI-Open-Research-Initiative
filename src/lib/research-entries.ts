import type { ResearchEntry } from "./types";

export const RESEARCH_ENTRIES: ResearchEntry[] = [
  {
    id: "gei-01",
    code: "GEI-01",
    title: "The Adam / A-DAM Hypothesis",
    category: "Linguistic Question",
    question:
      'Does the Hebrew word אָדָם (adam) carry any semantic connection to water containment or dam-building, or is the English "A-DAM" association a modern sound coincidence?',
    scope:
      "Hebrew lexicography, comparative Semitic linguistics, etymology of אָדָם, phonological comparison with English.",
    biblicalPassages: ["Genesis 1:26–27", "Genesis 2:7", "Genesis 2:19–20", "Genesis 3:17–19", "Genesis 5:1–2"],
    sourceLanguageRefs: [
      "אָדָם (adam) — human, mankind, the proper name Adam",
      "אֲדָמָה (adamah) — ground, earth, soil",
      "אָדֹם (adom) — red",
    ],
    conventionalReading:
      "אָדָם derives from אֲדָמָה (ground/earth), referencing human creation from soil. The name carries connotations of earthiness, mortality, and connection to the land. No mainstream Hebrew lexicon associates the word with dam-building or water containment.",
    alternativeReading:
      'GEI proposes a sound-association between אָדָם and the English compound "A-DAM," suggesting a conceptual link between the first human and water-containment engineering. This is presented as an interpretive hypothesis, not a claim of Hebrew etymology.',
    geiProposal:
      "The association is offered as a modern interpretive lens — a phonetic observation that prompts further investigation into whether Genesis 1–6 describes water-management concepts. GEI does not claim English \"dam\" is derived from Hebrew.",
    evidence:
      "Not yet supplied. Requires comparative Semitic linguistic analysis, historical lexicography, and peer review by Hebrew scholars.",
    counterarguments:
      "The English word \"dam\" derives from Middle English/Germanic roots unrelated to Hebrew. Sound similarities across unrelated languages are common and do not establish semantic connection. The conventional אָדָם/אֲדָמָה etymology is well-established in Semitic scholarship.",
    testCriteria:
      "What Semitic linguistic evidence would be needed to establish (or rule out) a semantic connection? What methodology distinguishes meaningful cognates from coincidental phonetic similarity?",
    bibliography: [
      "Brown, F., Driver, S. R., & Briggs, C. A. (BDB Hebrew Lexicon)",
      "Koehler, L., & Baumgartner, W. (HALOT)",
      "Bouie, W. Jr. (2025). Genesis Engineered Interpretation. Zenodo. https://doi.org/10.5281/zenodo.17316845",
    ],
    version: "0.1.0",
    lastUpdated: "2025-01-01",
    reviewState: "Awaiting expert review — no peer review has been conducted.",
  },
  {
    id: "gei-02",
    code: "GEI-02",
    title: "Genesis 1–6 Textual Mapping",
    category: "Textual Analysis",
    question:
      "Can the narrative sequence in Genesis 1–6 be coherently mapped to stages of a water-management engineering project? What does the text support, and where does the mapping require insertion of concepts not present in the original language?",
    scope:
      "Genesis 1–6 exegesis, narrative structure, genre analysis, translation methodology, hermeneutics.",
    biblicalPassages: [
      "Genesis 1:1–2:3 (creation sequence)",
      "Genesis 2:4–25 (garden narrative)",
      "Genesis 3 (expulsion)",
      "Genesis 4 (Cain and Abel, city-building)",
      "Genesis 5 (genealogy)",
      "Genesis 6:1–22 (corruption, ark commission)",
    ],
    sourceLanguageRefs: [
      "רָקִיעַ (raqia) — expanse, firmament",
      "גַּן (gan) — garden, enclosed area",
      "נָהָר (nahar) — river",
      "תֵּבָה (tevah) — ark, box",
    ],
    conventionalReading:
      "Genesis 1–6 presents cosmogony, anthropogony, the fall, early human civilization, and the prelude to the flood. Genre ranges from liturgical cosmology to genealogical record to narrative theology. Standard translations do not present the text as an engineering manual.",
    alternativeReading:
      "GEI proposes that specific textual elements — the separation of waters, the garden's rivers, land management, and the ark — can be read as analogues to engineering concepts: containment, channeling, irrigation, and vessel construction.",
    geiProposal:
      "The textual mapping is offered as a structured hypothesis: if one reads the creation sequence as describing stages of water management, do the narrative details align with engineering logic? The proposal does not claim this is the original authorial intent.",
    evidence:
      "Not yet supplied. Requires verse-by-verse analysis, Hebrew source comparison, and assessment of where GEI aligns with versus departs from the text.",
    counterarguments:
      "The text is widely understood as theological narrative, not technical description. Mapping modern engineering concepts onto ancient text risks anachronism. Multiple alternative readings exist with stronger textual and historical support.",
    testCriteria:
      "What textual evidence would distinguish an intended engineering reference from a modern reinterpretation? Where does the mapping require adding concepts absent from the Hebrew text?",
    bibliography: [
      "Wenham, G. J. (1987). Genesis 1–15 (Word Biblical Commentary)",
      "Walton, J. H. (2009). The Lost World of Genesis One",
      "Bouie, W. Jr. (2025). Genesis Engineered Interpretation. Zenodo. https://doi.org/10.5281/zenodo.17316845",
    ],
    version: "0.1.0",
    lastUpdated: "2025-01-01",
    reviewState: "Awaiting expert review — no peer review has been conducted.",
  },
  {
    id: "gei-03",
    code: "GEI-03",
    title: "Mountain-to-Ocean Hydraulic Model",
    category: "Engineering Hypothesis",
    question:
      "Is the proposed mountain-to-ocean water-management system physically coherent? What engineering principles apply, what assumptions are required, and what evidence is missing?",
    scope:
      "Hydraulic engineering, hydrology, geomorphology, ancient water infrastructure, feasibility analysis.",
    biblicalPassages: [
      "Genesis 2:10–14 (four rivers)",
      "Genesis 7–8 (flood and recession)",
    ],
    sourceLanguageRefs: [
      "מַבּוּל (mabbul) — flood, deluge",
      "מַעְיָן (mayan) — spring, source",
      "תְּהוֹם (tehom) — deep, abyss",
    ],
    conventionalReading:
      "The four rivers describe the geography of Eden. The flood is a divine judgment with cosmic scope. These are theological and narrative elements, not engineering specifications.",
    alternativeReading:
      "GEI proposes that the described water movements — collection, distribution, containment, and catastrophic release — parallel the components of a large-scale hydraulic system: dam, reservoir, controlled release, channels, and overflow.",
    geiProposal:
      "The hydraulic model is a conceptual diagram mapping Genesis water references to engineering components. It is not presented as a reconstruction of an actual ancient system but as a framework for analyzing whether the text's water descriptions are internally coherent from an engineering perspective.",
    evidence:
      "Not yet supplied. Requires hydraulic modeling, elevation analysis, watershed assessment, and comparison with documented ancient water systems.",
    counterarguments:
      "No archaeological evidence confirms a Genesis-era dam system of the proposed scale. Ancient hydraulic engineering, while sophisticated, operated at much smaller scales. The model requires assumptions about geography, elevation, and technology not established in the text.",
    testCriteria:
      "What physical evidence (geological, archaeological, hydrological) would be necessary to support or refute the model? What are the minimum engineering requirements for the proposed system?",
    bibliography: [
      "Schnitter, N. J. (1994). A History of Dams: The Useful Pyramids",
      "Smith, N. (1971). A History of Dams",
      "Bouie, W. Jr. (2025). Genesis Engineered Interpretation. Zenodo. https://doi.org/10.5281/zenodo.17316845",
    ],
    version: "0.1.0",
    lastUpdated: "2025-01-01",
    reviewState: "Awaiting expert review — no peer review has been conducted.",
  },
  {
    id: "gei-04",
    code: "GEI-04",
    title: "Claims, Evidence & Open Questions",
    category: "Research Status Overview",
    question:
      "What does GEI actually claim, what evidence supports each claim, what counterarguments exist, and what remains unresolved?",
    scope:
      "Cross-disciplinary synthesis, claim classification, evidence inventory, open-question tracking.",
    biblicalPassages: ["Genesis 1–6 (complete scope)"],
    sourceLanguageRefs: [],
    conventionalReading:
      "Standard scholarship addresses Genesis 1–6 through established theological, literary, historical, and archaeological frameworks with extensive peer review.",
    alternativeReading:
      "GEI proposes an integrated framework spanning linguistics, textual analysis, hydraulic engineering, ancient technology, and mechanical engineering. The framework is at an early hypothesis stage.",
    geiProposal:
      "This entry serves as a living index of GEI claims organized by type: (1) Linguistic associations — phonetic observations, proposed but unverified semantic connections. (2) Textual mappings — proposed correspondences between narrative elements and engineering concepts. (3) Engineering analogies — structural, hydraulic, and mechanical parallels drawn to modern or ancient systems. (4) Historical claims — assertions about ancient technology that require archaeological substantiation. Each claim is classified as: observation, analogy, hypothesis, or evidence-based conclusion. Most GEI claims are currently at the observation or hypothesis stage.",
    evidence:
      "Not yet supplied. This entry will be updated as individual claims are reviewed and classified by contributing researchers.",
    counterarguments:
      "The overall framework has not undergone peer review. Individual claims range from plausible observations worth investigating to speculative associations requiring substantial evidence. Critics note the risk of confirmation bias when reading modern concepts into ancient texts.",
    testCriteria:
      "For each claim: What specific evidence would confirm it? What evidence would weaken or refute it? What is the current evidence status? This entry will track these assessments as research progresses.",
    bibliography: [
      "Bouie, W. Jr. (2025). Genesis Engineered Interpretation. Zenodo. https://doi.org/10.5281/zenodo.17316845",
    ],
    version: "0.1.0",
    lastUpdated: "2025-01-01",
    reviewState: "Awaiting expert review — no peer review has been conducted.",
  },
];
