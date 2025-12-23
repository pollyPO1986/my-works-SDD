/**
 * SEO 工具函數 - 用於管理頁面元標籤和結構化數據
 *
 * 功能：
 * - 設置頁面標題和描述
 * - 添加 Open Graph 標籤
 * - 添加 Twitter Card 標籤
 * - 生成 Schema.org 結構化數據
 * - 管理 Canonical URLs
 */

/**
 * 定義 SEO 元數據接口
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogUrl?: string;
  twitterHandle?: string;
  canonicalUrl?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

/**
 * 動態更新 HTML 頭部元標籤
 * 用於支持無法使用 React Helmet 的場景
 *
 * @param metadata SEO 元數據對象
 */
export function updateMetaTags(metadata: SEOMetadata): void {
  // 更新標題
  document.title = metadata.title;

  // 更新或創建描述元標籤
  updateOrCreateMetaTag('description', metadata.description);

  // 更新關鍵詞
  if (metadata.keywords && metadata.keywords.length > 0) {
    updateOrCreateMetaTag('keywords', metadata.keywords.join(', '));
  }

  // 添加 Open Graph 標籤
  updateOrCreateMetaTag('og:title', metadata.title, 'property');
  updateOrCreateMetaTag('og:description', metadata.description, 'property');

  if (metadata.ogImage) {
    updateOrCreateMetaTag('og:image', metadata.ogImage, 'property');
  }

  if (metadata.ogUrl) {
    updateOrCreateMetaTag('og:url', metadata.ogUrl, 'property');
    updateOrCreateMetaTag('og:type', 'website', 'property');
  }

  // 添加 Twitter Card 標籤
  if (metadata.twitterHandle) {
    updateOrCreateMetaTag('twitter:creator', metadata.twitterHandle);
  }
  updateOrCreateMetaTag('twitter:card', 'summary_large_image');
  updateOrCreateMetaTag('twitter:title', metadata.title);
  updateOrCreateMetaTag('twitter:description', metadata.description);

  if (metadata.ogImage) {
    updateOrCreateMetaTag('twitter:image', metadata.ogImage);
  }

  // 設置 Canonical URL
  if (metadata.canonicalUrl) {
    updateOrCreateCanonicalLink(metadata.canonicalUrl);
  }

  // 添加作者信息
  if (metadata.author) {
    updateOrCreateMetaTag('author', metadata.author);
  }

  // 添加發佈和修改日期
  if (metadata.publishedDate) {
    updateOrCreateMetaTag('article:published_time', metadata.publishedDate, 'property');
  }

  if (metadata.modifiedDate) {
    updateOrCreateMetaTag('article:modified_time', metadata.modifiedDate, 'property');
  }
}

/**
 * 更新或創建元標籤
 *
 * @param name 元標籤的 name 或 property
 * @param content 元標籤的內容
 * @param attr 使用 'property'（Open Graph）或 'name'（默認）
 */
function updateOrCreateMetaTag(
  name: string,
  content: string,
  attr: 'property' | 'name' = 'name'
): void {
  let element = document.querySelector(`meta[${attr}="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

/**
 * 更新或創建 Canonical Link
 *
 * @param url Canonical URL
 */
function updateOrCreateCanonicalLink(url: string): void {
  let link = document.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', url);
}

/**
 * 生成 Schema.org 結構化數據（JSON-LD 格式）
 * 用於幫助搜索引擎理解頁面內容
 */
export interface SchemaOrgData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

/**
 * 創建 Person Schema（個人信息）
 *
 * @param name 人名
 * @param title 職位/標題
 * @param image 頭像 URL
 * @param url 個人網站 URL
 * @param sameAs 社群媒體鏈接
 * @returns Schema.org Person 對象
 */
export function createPersonSchema(
  name: string,
  title: string,
  image: string,
  url: string,
  sameAs: string[] = []
): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: title,
    image,
    url,
    sameAs,
  };
}

/**
 * 創建 Organization Schema（組織信息）
 *
 * @param name 組織名稱
 * @param url 組織網站
 * @param logo Logo URL
 * @returns Schema.org Organization 對象
 */
export function createOrganizationSchema(name: string, url: string, logo: string): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
  };
}

/**
 * 創建 CreativeWork Schema（作品信息）
 *
 * @param name 作品名稱
 * @param description 作品描述
 * @param image 作品圖片 URL
 * @param url 作品 URL
 * @param datePublished 發佈日期
 * @param author 作者名稱
 * @returns Schema.org CreativeWork 對象
 */
export function createCreativeWorkSchema(
  name: string,
  description: string,
  image: string,
  url: string,
  datePublished: string,
  author: string
): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    image,
    url,
    datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
  };
}

/**
 * 在頁面中插入 JSON-LD 結構化數據
 *
 * @param schema Schema.org 對象
 */
export function injectSchema(schema: SchemaOrgData | SchemaOrgData[]): void {
  const script = document.createElement('script');
  script.type = 'application/ld+json';

  // 如果是數組，使用 Graph 格式
  if (Array.isArray(schema)) {
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': schema,
    });
  } else {
    script.textContent = JSON.stringify(schema);
  }

  document.head.appendChild(script);
}

/**
 * 組合函數：更新所有 SEO 信息（元標籤 + Schema）
 *
 * @param metadata SEO 元數據
 * @param schemas Schema.org 對象數組或單個對象
 */
export function updateSEO(metadata: SEOMetadata, schemas?: SchemaOrgData | SchemaOrgData[]): void {
  updateMetaTags(metadata);

  if (schemas) {
    injectSchema(schemas);
  }
}
