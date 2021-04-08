import { getRequest } from './ServiceModel';
export const getJobsFromServer = async (pageNum) => {
    let response = await getRequest(`https://jobportal.pk/wp-json/wp/v2/posts?page=${pageNum}&_embed`);
    let jobs = [];
    try {
        for (let i = 0; i < response.data.length; i++) {
            let job = {
                title: response.data[i].title.rendered,
                date: response.data[i].date,
                cover: response.data[i]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url,
                highResCover: response.data[i]._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url,
                content: response.data[i].content.rendered
            }
            jobs.push(job)
        }
    } catch (e) {
        console.log(e)
    }
    return jobs;
}