type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

type FontDetail = {
  name: string;
  weight: FontWeight;
};

type FontName = "Regular" | "Bold";

export const FontFamily: Record<FontName, FontDetail> = {
  Regular: { name: "IBMPlexSansKR-Regular", weight: "400" },
  Bold: { name: "IBMPlexSansKR-Bold", weight: "700" },
};
