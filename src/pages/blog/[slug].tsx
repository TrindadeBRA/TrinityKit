
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { getAllPostSlugs, getPostBySlug } from "../api/getBlogData";
import { getMenuData } from "../api/getMenuData";
import BlogPostPage from "@/components/BlogPostPage";
import NewHeader from "@/components/NewHeader";
import MiniHero from "@/components/MiniHero";

export default function BlogPost({ menuData, post, settings }: any) {
    return (
        <>
            <NextSeo
                title={post?.yoast_head_json?.og_title}
                description={post?.yoast_head_json?.og_description}
                openGraph={{
                    type: 'article',
                    locale: 'pt_BR',
                    images: [{
                      url: post?.yoast_head_json?.og_image[0]?.url,
                      width: post?.yoast_head_json?.og_image[0]?.width,
                      height: post?.yoast_head_json?.og_image[0]?.height,
                    }],
                  }}
            />
            <NewHeader menuData={menuData} settings={settings}/>
            <MiniHero title={`${post?.title?.rendered}`} />
            <BlogPostPage post={post}/>
            <Footer menuData={menuData} settings={settings} />
        </>
    );
}


export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = await getAllPostSlugs();
    const paths = slugs.map((slug: string) => ({ params: { slug } }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
    const menuData = await getMenuData();
    const post = await getPostBySlug(params.slug as string); // Função para obter os dados do post com base no slug
    return {
        props: {
            menuData,
            post,
        },
    };
};
;