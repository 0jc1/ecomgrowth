import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import BASE_URL from '../constants.js';
import TextInput from '../components/TextInput';

const Settings = () => {
  const [config, setConfig] = useState({
    shopify_access_token: '',
    shopify_blog_id: 1,
    shopify_store: '',
    company_name: '',
    blog_posts_per_wk: 1,
    neetsai_api_key: ''
  });

  // Fetch the config values from the API
  useEffect(() => {
    fetch(BASE_URL + '/config')
      .then((response) => response.json())
      .then((data) => setConfig(data))

      .catch((error) => console.error('Error fetching config:', error));


  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  // Handle form submission to save the config
  const handleSubmit = (e) => {

    e.preventDefault();
    fetch(BASE_URL + '/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        }
      })
      .catch((error) => console.error('Error updating config:', error));
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-5 xl:col-span-3">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Settings
                  </h3>
                </div>

                <div className="p-7">

                  <TextInput
                    label="Shopify Access Token"
                    name="shopify_access_token"
                    id="shopify_access_token"
                    value={config.shopify_access_token}
                    onChange={handleChange}
                  />

                  <TextInput
                    label="Shopify Store"
                    name="shopify_store"
                    id="shopify_store"
                    value={config.shopify_store}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Company Name"
                    name="company_name"
                    id="company_name"
                    value={config.company_name}
                    onChange={handleChange}
                  />

                  <TextInput
                    label="NeetsAI API Key"
                    name="neetsai_api_key"
                    id="neetsai_api_key"
                    value={config.neetsai_api_key}
                    onChange={handleChange}
                  />

                  <div className="border-b border-stroke py-4 mb-3 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Auto Blog
                    </h3>
                  </div>

                  <TextInput
                    label="Blog Posts per week"
                    name="blog_posts_per_wk"
                    id="blog_posts_per_wk"
                    type="number"
                    value={config.blog_posts_per_wk}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Shopify Blog ID"
                    name="shopify_blog_id"
                    id="shopify_blog_id"
                    value={config.shopify_blog_id}
                    onChange={handleChange}
                  />

                  <div className="border-b border-stroke py-4 mb-3 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Auto Ads
                    </h3>
                  </div>

                  <div className="border-b border-stroke py-4 mb-3 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Product Entry
                    </h3>
                  </div>
                  <div className="border-b border-stroke py-4 mb-3 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Order Fulfillment
                    </h3>
                  </div>
                  <div className="border-b border-stroke py-4 mb-3 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Accounting
                    </h3>
                  </div>
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Settings;
