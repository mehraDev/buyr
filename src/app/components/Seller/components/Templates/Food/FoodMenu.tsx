import { Col, Row } from "ui/basic";
import CategoryViewer from "./CategoryViewer";
import { useTheme } from "styled-components";
import { IProductFood } from "app/interfaces";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IFoodTag } from "app/interfaces/Shop/product";
import { Drawer } from "ui/Drawer";
import FilterSortSearch from "./components/FilterAndSort/FilterAndSort";
import categoriseProducts from "./utils/categoriseProducts";
import { SearchCard } from "ui/Search";
import ItemFoodCard from "./FoodItemCard";
import MenuButton from "./components/MenuButton";
import CategorySlider from "./components/CategorySlider/CategorySlider";
import FilterCard from "./components/FilterCard/FilterCard";
import { Sticky } from "ui/Sticky";

interface IFoodMenu {
  products: IProductFood[];
  scrollContainer?: React.RefObject<HTMLDivElement>;
}

export enum ESortType {
  PriceLowToHigh = "Price: Low to High",
  PriceHighToLow = "Price: High to Low",
}

const FoodMenu: React.FC<IFoodMenu> = ({ products, scrollContainer }) => {
  const theme = useTheme();
  const [activeTags, setActiveTags] = useState<IFoodTag[]>([]);
  const filterProducts =
    activeTags.length > 0
      ? products.filter((product) =>
          product.tags?.some((tag) => activeTags.includes(tag))
        )
      : products;

  const categoryCounts: { [category: string]: number } = {};
  const [isSortDrawer, setSortDrawer] = useState(false);
  const [tagsList, setTagsList] = useState<IFoodTag[]>([]);

  const toggleSortDrawer = () => {
    setSortDrawer(!isSortDrawer);
  };

  const handleTagClick = (tag: IFoodTag) => {
    setActiveTags((prevActiveTags) => {
      if (prevActiveTags.includes(tag)) {
        return prevActiveTags.filter((t) => t !== tag); // Remove tag if it's already active
      } else {
        return [...prevActiveTags, tag]; // Add tag if it's not already active
      }
    });
  };

  useEffect(() => {
    const initializeTagsList = () => {
      const extractedTags = new Set<IFoodTag>();
      products.forEach((product) => {
        if (product.tags && Array.isArray(product.tags)) {
          product.tags.forEach((tag) => {
            extractedTags.add(tag);
          });
        }
      });
      setTagsList(Array.from(extractedTags));
    };
    initializeTagsList();
  }, [products]);

  products.forEach((product) => {
    if (product.category) {
      let cat;
      if (typeof product.category === "string") {
        cat = product.category;
      } else {
        cat = product.category[0];
      }
      if (categoryCounts[cat]) {
        categoryCounts[cat]++;
      } else {
        categoryCounts[cat] = 1;
      }
    } else {
      if (categoryCounts["Others"]) {
        categoryCounts["Others"]++;
      } else {
        categoryCounts["Others"] = 1;
      }
    }
  });

  const [activeSort, setActiveSort] = useState<ESortType | null>(null);
  const sortingOptions = Object.values(ESortType);

  const handleSortChange = (sort: ESortType) => {
    if (activeSort === sort) {
      setActiveSort(null);
    } else {
      setActiveSort(sort);
    }
    toggleSortDrawer();
  };
  const [isSearch, setIsSearch] = useState(false);

  const handleShowSearch = () => {
    setIsSearch(true);
  };

  const topLevelCategories = Object.keys(
    categoriseProducts(filterProducts)
  ).map((cat) => cat.toLowerCase());

  const [stickyHeaderOffset, setStickyHeaderOffset] = useState(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [stickyHeaderHeight, setStickyHeaderHeight] = useState(0);

  const handleCategoryPosition = useCallback(
    (category: string, position: number) => {
      categoryPositionsRef.current[category] = position;
    },
    []
  );

  useEffect(() => {
    const scrollContainer = window;
    const handleScroll = () => {
      const scrollPosition =
        scrollContainer instanceof HTMLElement
          ? scrollContainer.screenTop
          : scrollContainer.scrollY;
      let newActiveCategory = "";
      let newActiveIndex = -1;
      for (const [category, position] of Object.entries(
        categoryPositionsRef.current
      )) {
        if (scrollPosition >= position - (stickyHeaderHeight + 8)) {
          newActiveCategory = category;
          newActiveIndex = Object.keys(categoryPositionsRef.current).indexOf(
            category
          );
        }
      }
      setActiveCategory(newActiveCategory.toLowerCase());
      setActiveCategoryIndex(newActiveIndex);
    };
    handleScroll();
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [stickyHeaderHeight, filterProducts]);

  const categoryPositionsRef = useRef<{ [category: string]: number }>({});
  const stickyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string) => {
    const position = categoryPositionsRef.current[category.toLowerCase()];
    if (position !== undefined) {
      const adjustedPosition = position - stickyHeaderHeight;
      window.scrollTo({
        top: adjustedPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const updateHeight = () => {
      if (stickyRef && stickyRef.current) {
        setStickyHeaderOffset(stickyRef.current.offsetTop);
      }
      if (headerRef && headerRef.current) {
        setStickyHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
    };
    updateHeight();

    const handleResize = () => {
      updateHeight();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [products]);

  return (
    <Col p={"0rem 0rem 5rem"} ref={stickyRef}>
      <Col
        style={{
          position: "sticky",
          top: "0",
          zIndex: 1,
          background: theme.neutralColor.bgContainer,
        }}
        ref={headerRef}
      >
        <Sticky
          fd={"c"}
          at={stickyHeaderOffset}
          style={{
            borderBottom: `1px solid ${theme.neutralColor.borderSecondary}`,
          }}
          stickyStyle={{ boxShadow: "0 1px 6px 0 rgba(51, 53, 57, 0.28)" }}
        >
          <FilterSortSearch
            toggleDrawer={toggleSortDrawer}
            onSearch={handleShowSearch}
            tagList={tagsList}
            activeTagsList={activeTags}
            handleTagClick={handleTagClick}
          />
          <CategorySlider
            onClick={handleCategoryClick}
            categories={topLevelCategories}
            activeCategoryIndex={activeCategoryIndex}
          />
        </Sticky>
      </Col>
      <CategoryViewer
        scrollContainer={scrollContainer}
        products={filterProducts}
        sort={activeSort}
        onCategoryPositionsUpdate={handleCategoryPosition}
      />
      <MenuButton
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
        categoryCounts={categoryCounts}
      />
      <Drawer isOpen={isSearch} h="100%">
        <SearchCard
          onClose={() => setIsSearch(false)}
          searchItems={products}
          filterField={(item) => item.name.toLowerCase()}
          searchQuery={searchTerm}
          onSearch={(q) => setSearchTerm(q.toLowerCase())}
        >
          {(product, index) => (
            <Row
              key={index}
              p={"1rem 0.5rem "}
              br="0"
              style={{
                borderBottom: `1px dashed #c5c5c5`,
                background: theme.neutralColor.bgContainer,
              }}
            >
              <ItemFoodCard item={product} />
            </Row>
          )}
        </SearchCard>
      </Drawer>
      <Drawer isOpen={isSortDrawer} h="100%">
        <FilterCard
          sortingOptions={sortingOptions}
          handleSortChange={handleSortChange}
          activeSort={activeSort}
          onClose={toggleSortDrawer}
        />
      </Drawer>
    </Col>
  );
};

export default React.memo(FoodMenu);
