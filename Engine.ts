import 'fastestsmallesttextencoderdecoder';
import { buildSearchEngine } from "@coveo/headless";

export const engine = buildSearchEngine({
  configuration: {
    organizationId: "[...]",
    accessToken: "[...]",
  },
});
