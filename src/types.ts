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
