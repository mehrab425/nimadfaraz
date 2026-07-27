import fs from "fs/promises";
import path from "path";
import siteDataFallback from "../../data/site-data.json";

export type SiteData = typeof siteDataFallback;

const DATA_PATH = path.join(process.cwd(), "data", "site-data.json");

export async function getSiteData(): Promise<SiteData> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(raw) as SiteData;
  } catch {
    return siteDataFallback;
  }
}

export async function saveSiteData(data: SiteData): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
}
