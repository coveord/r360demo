import 'fastestsmallesttextencoderdecoder';
import { buildSearchEngine } from "@coveo/headless";

export const engine = buildSearchEngine({
  configuration: {
    organizationId: "relevance360hackathon0541de9q33d",
    accessToken: "xxad442568-8596-438a-a426-de9aa7d8cca0",
    search: {
      timezone: 'America/Toronto'
    }
  },
});
