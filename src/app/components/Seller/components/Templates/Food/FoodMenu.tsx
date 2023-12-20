import { Col, Row } from "ui/basic";
import CategoryViewer from "./CategoryViewer";
import { useTheme } from "styled-components";
import { IProductFood } from "app/interfaces";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IFoodTag } from "app/interfaces/Shop/product";
import { Drawer } from "ui/Drawer";
import FilterSort from "./components/FilterAndSort/FilterAndSort";
import categoriseProducts from "./utils/categoriseProducts";
import { SearchCard } from "ui/Search";
import ItemFoodCard from "./FoodItemCard";
import MenuButton from "./components/MenuButton";
import CategorySlider from "./components/CategorySlider/CategorySlider";
import FilterCard from "./components/FilterCard/FilterCard";
import { Sticky } from "ui/Sticky";
import Button from "ui/Button";
import Icon, { IconName } from "ui/Icon";

interface IFoodMenu {
  products: IProductFood[];
  scrollContainer?: React.RefObject<HTMLDivElement>;
}

export enum ESortType {
  PriceLowToHigh = "Price: Low to High",
  PriceHighToLow = "Price: High to Low",
  AlphabeticalAsc = "Alphabetical: A to Z",
  AlphabeticalDesc = "Alphabetical: Z to A",
}

const FoodMenu: React.FC<IFoodMenu> = ({ products, scrollContainer }) => {
  const theme = useTheme();

  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [tagsList, setTagsList] = useState<string[]>([]);

  const filterProducts =
    activeTags.length > 0
      ? products.filter((product) =>
          activeTags.every((activeTag) =>
            product.tags?.some((tag: IFoodTag) => tag.name === activeTag)
          )
        )
      : products;

  const categoryCounts: { [category: string]: number } = {};
  const [isSortDrawer, setSortDrawer] = useState(false);

  const toggleSortDrawer = () => {
    setSortDrawer(!isSortDrawer);
  };

  const handleTagClick = (tag: string) => {
    setActiveTags((prevActiveTags) => {
      if (prevActiveTags.includes(tag)) {
        return prevActiveTags.filter((t) => t !== tag);
      } else {
        return [...prevActiveTags, tag];
      }
    });
  };

  useEffect(() => {
    const initializeTagsList = () => {
      const extractedTags = new Set<string>();
      products.forEach((product) => {
        if (product.tags && Array.isArray(product.tags)) {
          product.tags.forEach((tag) => {
            extractedTags.add(tag.name);
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

  const [activeSort, setActiveSort] = useState<ESortType>(
    ESortType.AlphabeticalAsc
  );
  const sortingOptions = Object.values(ESortType);

  const handleSortChange = (sort: ESortType) => {
    if (activeSort === sort) {
      setActiveSort(ESortType.AlphabeticalAsc);
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
  // const [activeCategory, setActiveCategory] = useState<string>("");
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
      // let newActiveCategory = "";
      let newActiveIndex = -1;
      for (const [category, position] of Object.entries(
        categoryPositionsRef.current
      )) {
        if (scrollPosition >= position - (stickyHeaderHeight + 8)) {
          // newActiveCategory = category;
          newActiveIndex = Object.keys(categoryPositionsRef.current).indexOf(
            category
          );
        }
      }
      // setActiveCategory(newActiveCategory.toLowerCase());
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

  const ordering = true;
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
          <Row a="center" j="between" style={{ gap: "1rem" }}>
            <Row p={"0.5rem  "} style={{ overflow: "scroll" }}>
              <CategorySlider
                onClick={handleCategoryClick}
                categories={topLevelCategories}
                activeCategoryIndex={activeCategoryIndex}
              />
            </Row>

            <Row p={"0.5rem"} w="initial" a="center">
              <Button
                variant="secondary"
                border="1px solid #d9d9e3"
                padding="  0.5rem"
                br=".35rem"
                onClick={handleShowSearch}
              >
                <Icon
                  name={IconName.Search}
                  borderRadius={0}
                  padding="0"
                  width={1}
                  height={1}
                  color={theme.neutralColor.textTertiary}
                />
              </Button>
            </Row>
          </Row>
        </Sticky>
      </Col>
      <CategoryViewer
        scrollContainer={scrollContainer}
        products={filterProducts}
        activeSort={activeSort}
        onCategoryPositionsUpdate={handleCategoryPosition}
        ordering={ordering}
      />
      <Row
        style={{
          position: "fixed",
          bottom: "1.5rem",
        }}
        p={"1rem "}
      >
        <Row
          style={{
            gap: "1rem",
            background: theme.neutralColor.bgLayout,
            boxShadow: "0 0 2px #00000027",
          }}
          br="14px"
          p={"1rem "}
          j="between"
          a="center"
        >
          <FilterSort
            toggleDrawer={toggleSortDrawer}
            tagList={tagsList}
            activeTagsList={activeTags}
            handleTagClick={handleTagClick}
          />
          {/* <MenuButton
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
            categoryCounts={categoryCounts}
          /> */}
        </Row>
      </Row>

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
