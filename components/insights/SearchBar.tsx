"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({
  initialValue = "",
}: {
  initialValue?: string;
}) {

  const router =
    useRouter();

  const [
    search,
    setSearch,
  ] = useState(
    initialValue
  );

  const handleSearch = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      search.trim()
    ) {

      router.push(
        `/insights/blogs?search=${encodeURIComponent(search)}`
      );

    } else {

      router.push(
        "/insights/blogs"
      );
    }
  };

  return (
    <form
      onSubmit={
        handleSearch
      }
    >
      <input
        type="text"
        placeholder="Search insights, AI, CRM, branding..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={{
          width: "100%",

          padding:
            "18px 22px",

          borderRadius:
            "18px",

          border:
            "1px solid #E5E7EB",

          outline: "none",

          fontSize: "15px",

          background:
            "white",
        }}
      />
    </form>
  );
}