import React from "react";

export default function Post() {
  return (
    <div className="relative pt-16 pb-32">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Post Page</h1>
        <p className="text-gray-600">Explore our community posts</p>
      </header>
      <div className="text-center mb-8">
        <div className="card-container">
          {/* Example Card 1 */}
          <div className="card card-1">
            <div className="card-img"></div>
            <a href="#" className="card-link">
              <div className="card-img-hovered"></div>
            </a>
            <div className="card-info">
              <div className="card-about">
                <a className="card-tag tag-news">NEWS</a>
                <div className="card-time">6/11/2018</div>
              </div>
              <h1 className="card-title">
                There has been a big Tesla accident in New Jersey
              </h1>
              <div className="card-creator">
                by <a href="#">Sardorbek Usmonov</a>
              </div>
            </div>
          </div>

          {/* Example Card 2 */}
          <div className="card card-2">
            <div className="card-img"></div>
            <a href="#" className="card-link">
              <div className="card-img-hovered"></div>
            </a>
            <div className="card-info">
              <div className="card-about">
                <a className="card-tag">Tech</a>
                <div className="card-time">6/07/2018</div>
              </div>
              <h1 className="card-title">
                Samsung laptops are exploding again
              </h1>
              <div className="card-creator">
                by <a href="#">Tyler Platt</a>
              </div>
            </div>
          </div>

          {/* Example Card 3 */}
          <div className="card card-3">
            <div className="card-img"></div>
            <a href="#" className="card-link">
              <div className="card-img-hovered"></div>
            </a>
            <div className="card-info">
              <div className="card-about">
                <a className="card-tag tag-deals">Deals</a>
                <div className="card-time">5/27/2018</div>
              </div>
              <h1 className="card-title">
                Apple is having a big sale for the first time
              </h1>
              <div className="card-creator">
                by <a href="#">Timur Mirzoyev</a>
              </div>
            </div>
          </div>

          {/* Example Card 4 */}
          <div className="card card-4">
            <div className="card-img"></div>
            <a href="#" className="card-link">
              <div className="card-img-hovered"></div>
            </a>
            <div className="card-info">
              <div className="card-about">
                <a className="card-tag tag-politics">Politics</a>
                <div className="card-time">5/20/2018</div>
              </div>
              <h1 className="card-title">
                Net Neutrality is coming to its end
              </h1>
              <div className="card-creator">
                by <a href="#">Gregory Trem</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
