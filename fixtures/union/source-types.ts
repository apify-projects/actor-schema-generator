export type SearchScraperDatasetItem = {
    /**
     * @description Unique Instagram user ID — profile results only
     * @example "1234567890123456789"
     */
    id?: string | null;
    /**
     * @description Instagram username of the profile — profile results only
     * @example "exampleuser"
     */
    username?: string | null;
    /**
     * @description URL of the Instagram profile or hashtag page
     * @example "https://www.instagram.com/exampleuser"
     */
    url?: string | null;
    /**
     * @description Full display name of the user — profile results only
     * @example "Example User"
     */
    fullName?: string | null;
    /**
     * @description Profile biography text — profile results only
     * @example "This is an example biography."
     */
    biography?: string | null;
    /**
     * @description External URL linked in the profile bio — profile results only
     * @example "https://example.com"
     */
    externalUrl?: string | null;
    /**
     * @description Shimmed (tracked) version of the external URL — profile results only
     * @example "https://l.instagram.com/?u=https%3A%2F%2Fexample.com"
     */
    externalUrlShimmed?: string | null;
    /**
     * @description All bio links added to the profile — profile results only
     * @example [{"url": "https://example.com", "title": "My Website"}]
     */
    externalUrls?:
        | {
              [k: string]: unknown;
          }[]
        | null;
    /**
     * @description Number of followers the profile has — profile results only
     * @example 50000
     */
    followersCount?: number | null;
    /**
     * @description Number of accounts the profile follows — profile results only
     * @example 500
     */
    followsCount?: number | null;
    /**
     * @description Whether the profile has an Instagram broadcast channel — profile results only
     * @example false
     */
    hasChannel?: boolean | null;
    /**
     * @description Number of highlight reels on the profile — profile results only
     * @example 5
     */
    highlightReelCount?: number | null;
    /**
     * @description Whether the account is a business account — profile results only
     * @example false
     */
    isBusinessAccount?: boolean | null;
    /**
     * @description Whether the account joined Instagram recently — profile results only
     * @example false
     */
    joinedRecently?: boolean | null;
    /**
     * @description Business category of the account — profile results only
     * @example "Clothing (Brand)"
     */
    businessCategoryName?: string | null;
    /**
     * @description Whether the profile is private — profile results only
     * @example false
     */
    private?: boolean | null;
    /**
     * @description Whether the profile has a verified badge — profile results only
     * @example false
     */
    verified?: boolean | null;
    /**
     * @description URL of the profile picture — profile results only
     * @example "https://example.com/profile/pic/123456.jpg"
     */
    profilePicUrl?: string | null;
    /**
     * @description URL of the high-resolution profile picture — profile results only
     * @example "https://example.com/profile/pic/123456_hd.jpg"
     */
    profilePicUrlHD?: string | null;
    /**
     * @description Number of IGTV videos on the profile — profile results only
     * @example 12
     */
    igtvVideoCount?: number | null;
    /**
     * @description Related Instagram profiles suggested by Instagram — profile results only
     * @example []
     */
    relatedProfiles?:
        | {
              [k: string]: unknown;
          }[]
        | null;
    /**
     * @description Most recent IGTV videos from the profile — profile results only
     * @example []
     */
    latestIgtvVideos?:
        | {
              [k: string]: unknown;
          }[]
        | null;
    /**
     * @description Total number of posts on the profile — profile results only
     * @example 150
     */
    postsCount?: number | null;
    /**
     * @description Most recent posts from the profile — profile results only
     * @example []
     */
    latestPosts?:
        | {
              [k: string]: unknown;
          }[]
        | null;
    /**
     * @description Whether the profile currently has a public story — profile results only
     * @example false
     */
    hasPublicStory?: boolean | null;
    /**
     * @description Whether the profile is restricted (e.g. age-gated) — profile results only
     * @example false
     */
    isRestrictedProfile?: boolean | null;
    /**
     * @description Reason the profile is restricted, if applicable — profile results only
     * @example "Age-restricted content"
     */
    restrictionReason?: string | null;
    /**
     * @description Business address associated with the profile — profile results only
     * @example {"street_address": "123 Example St", "city_name": "Example City"}
     */
    businessAddress?: {
        [k: string]: unknown;
    } | null;
    /**
     * @description Facebook ID linked to the Instagram profile — profile results only
     * @example "123456789"
     */
    fbid?: string | null;
    /**
     * @description Hashtag name (without #) or place name — hashtag and location results only
     * @example "travel"
     */
    name?: string | null;
    /**
     * @description Related hashtags — hashtag results only
     * @example [{"name": "travelphotography", "count": 500000}]
     */
    related?:
        | {
              [k: string]: unknown;
          }[]
        | null;
    /**
     * @description Hashtags frequently used alongside this one — hashtag results only
     * @example [{"name": "photography", "count": 1000000}]
     */
    frequent?:
        | {
              [k: string]: unknown;
          }[]
        | null;
    /**
     * @description Top posts for this hashtag — hashtag results only
     * @example []
     */
    topPosts?:
        | {
              [k: string]: unknown;
          }[]
        | null;
    /**
     * @description Unique identifier of the place — location results only
     * @example "258096160"
     */
    location_id?: string | null;
    /**
     * @description Latitude coordinate of the place — location results only
     * @example 40.748817
     */
    lat?: number | null;
    /**
     * @description Longitude coordinate of the place — location results only
     * @example -73.985428
     */
    lng?: number | null;
    /**
     * @description Street address of the place — location results only
     * @example {"street_address": "123 Example St", "city_name": "Example City", "country_code": "US"}
     */
    address?:
        | {
              [k: string]: unknown;
          }
        | string;
    /**
     * @description Phone number of the place — location results only
     * @example "+1 555-123-4567"
     */
    phone?: string | null;
    /**
     * @description Opening hours of the place — location results only
     * @example {"monday": "9:00 AM - 9:00 PM", "tuesday": "9:00 AM - 9:00 PM"}
     */
    hours?: {
        [k: string]: unknown;
    } | null;
    /**
     * @description Website URL of the place — location results only
     * @example "https://example.com"
     */
    website?: string | null;
    /**
     * @description Recent posts at the location — location results only
     * @example "1.77 M"
     */
    posts?:
        | {
              [k: string]: unknown;
          }[]
        | string;
    /**
     * @description Input URL or search query used to find this result
     * @example "https://www.instagram.com/exampleuser"
     */
    inputUrl?: string | null;
    /**
     * @description Search term used to find this result
     * @example "example brand"
     */
    searchTerm?: string | null;
    /**
     * @description Source of the search that found this result
     * @example "facebook-ads"
     */
    searchSource?: string | null;
    /**
     * @description Facebook page linked to the result
     * @example {"pageIsDeleted": false, "pageAlias": "examplepage"}
     */
    facebookPage?: {
        [k: string]: unknown;
    } | null;
    /**
     * @description Threads.net profile linked to this account
     * @example {"username": "exampleuser"}
     */
    threadsNetProfile?: {
        [k: string]: unknown;
    } | null;
    /**
     * @description Error code if the result could not be fully scraped
     * @example "not_found"
     */
    error?: string | null;
    /**
     * @description Human-readable description of the error
     * @example "Profile does not exist"
     */
    errorDescription?: string | null;
    /**
     * @description Array of error messages encountered during scraping
     * @example ["Error: BLOCKED\n    at getRouteDefinition ..."]
     */
    requestErrorMessages?: string[] | null;
};
