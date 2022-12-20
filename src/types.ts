export interface ToolAttributes {
  tool_code: number;
  tooltype_name: string;
  subtype_name: string;
  brand_name: string;
  category_name: string;
  usage_type: string;
  rack: number;
  current_status: string;
  last_scan: string;
}

export interface TakeToolAttributes {
  rack: number;
  current_status: string;
  usage_type: string;
}

export interface ReturnToolAttributes {
  rack: number;
}

export const ToolStatusKeys = [
  "good",
  "maintenance required",
  "requires repair",
] as const;

export const ToolStatusValues = [
  "Good",
  "Maintenance Required",
  "Requires Repair",
] as const;

export const ToolStatusKeyValuePairs: Array<{ key: string; value: string }> =
  [];

for (let i = 0; i < ToolStatusKeys.length; ++i) {
  ToolStatusKeyValuePairs.push({
    key: ToolStatusKeys[i],
    value: ToolStatusValues[i],
  });
}
