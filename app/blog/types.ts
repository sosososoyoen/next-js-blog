// 공통 타입 정의
export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags?: string[];
};

export type BlogPost = {
  metadata: Metadata;
  slug: string;
  content: string;
};
