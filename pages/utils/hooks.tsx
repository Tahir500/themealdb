import { MealList } from "@/interfaces";
import { groupBy, map, pickBy, trim } from "lodash";
import { useMemo } from "react";

export const useMeals = (data: MealList | undefined) => {
  return useMemo(() => {
    const meal = data?.meals?.[0];
    const array = ["strMeasure", "strIngredient"];

    const values = pickBy(meal, (value: string | null, key: string) => {
      return trim(value || "") && array.some(item => key.includes(item));
    });

    const list = map(
      groupBy(
        map(values, (value: string, key: string) => ({
          value: value,
          key: key.replace(/[^A-Z]+/gi, ""),
          id: key.replace(/[^\d.]/g, "")
        })),
        "id"
      ),
      (group: { value: string; key: string }[]) => ({
        [group[0].key]: group[0].value,
        [group[1]?.key]: group[1]?.value
      })
    );

    return {
      meal,
      list
    };
  }, [data]);
};
