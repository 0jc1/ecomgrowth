import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import Modal from '../components/Modal';

import React, { useEffect, useState } from 'react';
import BASE_URL from '../constants.js';

const AutoBlog = () => {
  const [blogData, setBlogData] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [bodyHtml, setBodyHtml] = useState("");
  const [isBlogDataLoading, setBlogDataLoading] = useState(true);
  const [isArticleDataLoading, setArticleDataLoading] = useState(true);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const previewArticle = (bodyHtml1) => {
    setBodyHtml(bodyHtml1);
    setModalVisible(true);
  };

  const deleteArticle = (blogId, id) => {
    var c = confirm("Are you sure you want to delete this article?");

    if (!c) {
      return;
    }

    const params = new URLSearchParams({
      blogId: blogId,
      articleId: id,
    }).toString();

    fetch(BASE_URL + `/deleteArticle?${params}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .catch(error => alert('Error: ' + error));

    setArticleData([]);
    getArticleData();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getArticleData = () => {
    fetch(BASE_URL + '/getArticles')
      .then(response => response.json())
      .then(data => {
        setArticleData(data.articles);
        setArticleDataLoading(false);
      })
      .catch(error => console.error('Error fetching blog data:', error));
  };

  useEffect(() => {
    fetch(BASE_URL + '/getBlogs')
      .then(response => response.json())
      .then(data => {
        setBlogData(data.blogs);
        setBlogDataLoading(false);
      })
      .catch(error => console.error('Error fetching blog data:', error));

    getArticleData();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Auto Blog" />

      <Modal isVisible={isModalVisible} onClose={closeModal} content={bodyHtml}>
        <h2 className="text-xl font-semibold">Preview</h2>
      </Modal>

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Shopify Blogs
          </h4>

          {isBlogDataLoading ? (
            <p>Loading blogs...</p>
          ) : (
            <div className="flex flex-col">
              <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Title
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Blog ID
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Tags
                  </h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Updated At
                  </h5>
                </div>
              </div>

              {blogData.map((blog, key) => (
                <div
                  className={`grid grid-cols-3 sm:grid-cols-5 ${key === blogData.length - 1
                    ? ''
                    : 'border-b border-stroke dark:border-strokedark'
                    }`}
                  key={key}
                >
                  <div className="flex items-center gap-3 p-2.5 xl:p-5">
                    <p className="text-black dark:text-white sm:block">
                      {blog.title}
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">{blog.id}</p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white sm:block">{blog.tags}</p>
                  </div>

                  <div className="  flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white sm:block">{formatDate(blog.updated_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <h4 className="mb-6 text-xl mt-6 font-semibold text-black dark:text-white">
            Shopify Blog Posts
          </h4>

          {isArticleDataLoading ? (
            <p>Loading articles...</p>
          ) : (
            <div className="flex flex-col">
              <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Title
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    ID
                  </h5>
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Tags
                  </h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Created At
                  </h5>
                </div>
                <div className=" p-2.5 text-center sm:block xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Actions
                  </h5>
                </div>
              </div>

              {articleData.map((art, key) => (
                <div
                  className={`grid grid-cols-3 sm:grid-cols-5 ${key === articleData.length - 1
                    ? ''
                    : 'border-b border-stroke dark:border-strokedark'
                    }`}
                  key={key}
                >
                  <div className="flex items-center gap-3 p-2.5 xl:p-5">
                    <p className="text-black dark:text-white sm:block">
                      {art.title}
                    </p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">{art.id}</p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white sm:block">{art.tags}</p>
                  </div>

                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white sm:block">{formatDate(art.updated_at)}</p>
                  </div>

                  <div className="flex items-center justify-center space-x-3.5">
                    <button onClick={() => previewArticle(art.body_html)} className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.66294 0.551305 9.40445C0.423284 9.13464 0.423284 8.86525 0.551305 8.59545C0.674805 8.33706 3.43106 3.17806 8.99981 3.17806C14.5686 3.17806 17.3248 8.33706 17.4483 8.59555C17.5763 8.86536 17.5763 9.13475 17.4483 9.40455C17.3248 9.66294 14.5686 14.8219 8.99981 14.8219ZM2.0388 9C2.81056 10.2492 5.56906 13.6781 8.99981 13.6781C12.4306 13.6781 15.1891 10.2492 15.9608 9C15.1891 7.75075 12.4306 4.32186 8.99981 4.32186C5.56906 4.32186 2.81056 7.75075 2.0388 9Z"
                          fill=""
                        />
                        <path
                          d="M8.99988 11.4033C7.46063 11.4033 6.23292 10.1741 6.23292 8.63553C6.23292 7.09678 7.46063 5.86894 8.99988 5.86894C10.5392 5.86894 11.767 7.09678 11.767 8.63553C11.767 10.1741 10.5392 11.4033 8.99988 11.4033ZM8.99988 7.02523C8.38786 7.02523 7.88971 7.5231 7.88971 8.13513C7.88971 8.74715 8.38786 9.24492 8.99988 9.24492C9.61191 9.24492 10.1101 8.74715 10.1101 8.13513C10.1101 7.5231 9.61191 7.02523 8.99988 7.02523Z"
                          fill=""
                        />
                      </svg>
                    </button>

                    <button onClick={() => deleteArticle(art.blog_id, art.id)} className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.75 4.5H11.75V3.75C11.75 2.784 10.966 2 10 2H8C7.034 2 6.25 2.784 6.25 3.75V4.5H4.25C3.421 4.5 2.75 5.171 2.75 6V7C2.75 7.309 2.941 7.575 3.229 7.696L4.19064 14.323C4.37242 15.5085 5.3553 16.3917 6.5475 16.4832C6.68272 16.4943 11.3173 16.4943 11.4525 16.4832C12.6447 16.3917 13.6276 15.5085 13.8094 14.323L14.771 7.696C15.059 7.575 15.25 7.309 15.25 7V6C15.25 5.171 14.579 4.5 13.75 4.5ZM7.75 3.75C7.75 3.612 7.862 3.5 8 3.5H10C10.138 3.5 10.25 3.612 10.25 3.75V4.5H7.75V3.75ZM14 7H4V6C4 5.862 4.112 5.75 4.25 5.75H13.75C13.888 5.75 14 5.862 14 6V7Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AutoBlog;
