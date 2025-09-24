import Header from "../../components/layout/Header/Header";
import LineDecor from "../../assets/icons/Line2.svg";
import dropdownIcon from "../../assets/icons/chevron-down.svg";
import FilterIcon from "../../assets/icons/adjustments-horizontal.svg";
import "./ProductListPage.scss";

export default function ProductListPage() {
  return (
    <>
      <Header />
      <div className="productList-header container">
        <h2>Products</h2>
        <div className="right-side">
          <p>Showing 1–10 of 100 results</p>
          <div className="line">
            <img src={LineDecor} alt="line" />
          </div>
          <div className="functionals">
            <div className="filter">
              <img src={FilterIcon} alt="filterIcon" />
              <span>Filter</span>
            </div>
            <div className="sort">
              <span>Sort By</span>
              <img src={dropdownIcon} alt="drop" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
