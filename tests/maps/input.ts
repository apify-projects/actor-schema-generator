export interface Coordinates {
    lat: number;
    lng: number;
}
// TODO: Lot of the values actually can fallback to undefined or null, but the types don't reflect that
// We should converge to some common type for all the values, maybe we just ignore the nulls and undefineds?

// TODO: It is really hard to type properly but most of the structure is stable, just some edges are often undefined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonData = any[];

// ts-unused-exports:disable-next-line
export type ReviewDatasetItem = TrimmedPlace & Review;

// ts-unused-exports:disable-next-line
export type PlaceDatasetItem = TrimmedPlace &
    DetailPagePlace &
    ExternalDetailedPlace &
    Partial<ExtraPlaceData>;

/**
 * @description A review posted by a user on Google Maps
 */
export type Review = Reviewer &
    LanguageInfo & {
        /**
         * @description Original text of the review in the reviewer's language
         * @examples ["Excellent laundry, clean and fresh environment, new machines and all working"]
         */
        text: string | null;

        /**
         * @description Translated review text in the target language
         * @examples ["Excellent laundry, clean and fresh environment, new machines and all working"]
         */
        textTranslated: string | null;

        /**
         * @description Publication date in relative format
         * @examples ["11 months ago"]
         */
        publishAt: string | null;

        /**
         * @description Publication date in ISO 8601 format
         * @examples ["2025-01-15T10:30:00.000Z"]
         */
        publishedAtDate: string;

        /**
         * @description Number of likes the review received
         */
        likesCount?: number;

        /**
         * @description Unique identifier for the review
         * @examples ["ChZDSUhNMG9nS0VJQ0FnSURidTRfNFNREAE"]
         */
        reviewId: string | null;

        /**
         * @description Direct URL to the review
         * @examples ["https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChZDSUhNMG9nS0VJQ0FnSURidTRfNFNREAE"]
         */
        reviewUrl: string | null;

        /**
         * @description Star rating (1-5)
         */
        stars: number | null;
        /**
         * @description Rating from external providers such as Tripadvisor
         * @examples ["4/10"]
         */
        rating: string | null;
        /**
         * @description Date when the business owner responded to the review
         * @examples ["2025-01-16T08:00:00.000Z"]
         */
        responseFromOwnerDate: string | null;
        /**
         * @description Text of the owner's response to the review
         * @examples ["Thank you for your positive feedback!"]
         */
        responseFromOwnerText: string | null;
        /**
         * @description Array of image URLs attached to the review
         * @examples [["https://lh3.googleusercontent.com/p/AF1QipO46METc51OY74zH4zSLZp2aBWDfyzi-ISukdK1=w426-h240-k-no"]]
         */
        reviewImageUrls?: string[];
        /**
         * @description Additional context about the review (e.g., visit type)
         * @examples [{"Visit type": "Dine in"}]
         */
        reviewContext?: Record<string, string>;
        /**
         * @description Detailed ratings for specific aspects (e.g., food, service, atmosphere)
         * @examples [{"Food": 5, "Service": 4, "Atmosphere": 5}]
         */
        reviewDetailedRating?: Record<string, number>;
        /**
         * @description Where the review originates, known values: "Google" and "Tripadvisor"
         * @examples ["Google"]
         */
        reviewOrigin: string | null;
        /**
         * @description Month and year when the place was visited
         * @examples ["January 2025"]
         */
        visitedIn: string | null;
    };

/**
 * @description Information about the person who wrote a review
 */
export interface Reviewer {
    /**
     * @description Full name of the reviewer
     * @examples ["Aura Toro"]
     */
    name: string | null;
    /**
     * @description Unique identifier for the reviewer
     * @examples ["106833772378732355960"]
     */
    reviewerId: string | null;
    /**
     * @description URL to the reviewer's Google Maps profile
     * @examples ["https://www.google.com/maps/contrib/106833772378732355960?hl=en-US"]
     */
    reviewerUrl: string | null;
    /**
     * @description Total number of reviews written by this reviewer
     */
    reviewerNumberOfReviews: number | null;
    /**
     * @description URL to the reviewer's profile photo
     * @examples ["https://lh3.googleusercontent.com/a-/AOh14GhXXXXXXXXX=s128-c0x00000000-cc-rp-mo"]
     */
    reviewerPhotoUrl: string | null;
    /**
     * @description Whether the reviewer is a Google Local Guide
     */
    isLocalGuide?: boolean;
}

/**
 * @description Language information for content that may be translated
 */
export interface LanguageInfo {
    /**
     * @description Language code of the original content
     * @examples ["en"]
     */
    originalLanguage: string | null;
    /**
     * @description Language code of the translated content
     * @examples ["es"]
     */
    translatedLanguage: string | null;
}

/**
 * @description Structured address components parsed from the full address
 */
export interface AddressParsed {
    /**
     * @description Neighborhood or district name
     * @examples ["Lake Como"]
     */
    neighborhood: string | null;
    /**
     * @description Street address including building number
     * @examples ["1408 S Crystal Lake Dr"]
     */
    street: string | null;
    /**
     * @description City name
     * @examples ["Orlando"]
     */
    city: string | null;
    /**
     * @description Two-letter country code (ISO 3166-1 alpha-2)
     * @examples ["US"]
     */
    countryCode: string | null;
    /**
     * @description Postal or ZIP code
     * @examples ["32806"]
     */
    postalCode: string | null;
    /**
     * @description State or province name
     * @examples ["Florida"]
     */
    state: string | null;
}

/**
 * @description Popular times data showing how busy a place is throughout the week
 */
export interface PopularTimesOutput {
    /**
     * @description Human-readable text describing current occupancy level
     * @examples ["Less busy than usual"]
     */
    popularTimesLiveText: string | null;
    /**
     * @description Current occupancy as a percentage (0-100)
     */
    popularTimesLivePercent: number | null;
    /**
     * @description Hourly occupancy data for each day of the week
     * @examples [{"Mo": [{"hour": 9, "occupancyPercent": 56}, {"hour": 10, "occupancyPercent": 62}]}]
     */
    popularTimesHistogram: Record<
        string,
        { hour: number; occupancyPercent: number }[]
    >;
}

/**
 * @description A web search result related to the place
 */
export interface WebResult {
    /**
     * @description Title of the web result
     * @examples ["Crystal Clean Laundromat - Orlando, FL"]
     */
    title: string | null;
    /**
     * @description Displayed URL (may be shortened or formatted)
     * @examples ["fastfreshlaundry.com"]
     */
    displayedUrl: string | null;
    /**
     * @description Full URL to the web page
     * @examples ["https://www.fastfreshlaundry.com/locations/crystal-clean-laundromat/"]
     */
    url: string | null;
    /**
     * @description Description or snippet from the web page
     * @examples ["Full-service laundromat with modern equipment and free WiFi"]
     */
    description: string | null;
}

/**
 * @description An answer to a question posted on Google Maps
 */
interface Answer {
    /**
     * @description The answer text
     * @examples ["Yes, they accept credit cards and mobile payments"]
     */
    answer: string | null;
    /**
     * @description When the answer was posted
     * @examples ["3 months ago"]
     */
    answerDate: string | null;
    /**
     * @description Information about who provided the answer
     * @examples [{"name": "John Doe", "url": "https://www.google.com/maps/contrib/123"}]
     */
    answeredBy: {
        /**
         * @description Name of the person who answered
         * @examples ["John Doe"]
         */
        name: string | null;
        /**
         * @description URL to the answerer's profile
         * @examples ["https://www.google.com/maps/contrib/123456"]
         */
        url: string | null;
    } | null;
}

/**
 * @description A question and its answers from the Q&A section on Google Maps
 */
export interface QuestionAndAnswers {
    /**
     * @description The question text
     * @examples ["Do they accept credit cards?"]
     */
    question: string | null;
    /**
     * @description Array of answers to the question
     * @examples [[{"answer": "Yes, they accept all major credit cards", "answerDate": "2 months ago", "answeredBy": {"name": "Jane Smith"}}]]
     */
    answers: Answer[];
    /**
     * @description When the question was asked
     * @examples ["6 months ago"]
     */
    askDate: string | null;
    /**
     * @description Information about who asked the question
     * @examples [{"name": "Mary Johnson", "url": "https://www.google.com/maps/contrib/789"}]
     */
    askedBy: {
        /**
         * @description Name of the person who asked
         * @examples ["Mary Johnson"]
         */
        name: string | null;
        /**
         * @description URL to the asker's profile
         * @examples ["https://www.google.com/maps/contrib/789456"]
         */
        url: string | null;
    } | null;
}

/**
 * @description A tag with frequency count extracted from reviews or place descriptions
 */
export interface Tag {
    /**
     * @description The tag text
     * @examples ["coffee"]
     */
    title: string | null;
    /**
     * @description Number of times this tag appears
     */
    count: number | null;
}

/**
 * @description Distribution of reviews across star ratings
 */
export interface ReviewsDistribution {
    /**
     * @description Number of 1-star reviews
     */
    oneStar: number;
    /**
     * @description Number of 2-star reviews
     */
    twoStar: number;
    /**
     * @description Number of 3-star reviews
     */
    threeStar: number;
    /**
     * @description Number of 4-star reviews
     */
    fourStar: number;
    /**
     * @description Number of 5-star reviews
     */
    fiveStar: number;
}

/**
 * @description Gas price information for gas stations
 */
export interface GasPrice {
    /**
     * @description Formatted price string with currency
     * @examples ["$3.45"]
     */
    priceTag: string | null;
    /**
     * @description When the price was last updated
     * @examples ["2 hours ago"]
     */
    updatedAt: string;
    /**
     * @description Unit of measurement (e.g., gallon, liter)
     * @examples ["gallon"]
     */
    unit: string | null;
    /**
     * @description Currency code
     * @examples ["USD"]
     */
    currency: string | null;
    /**
     * @description Numeric price value
     */
    price: number | null;
    /**
     * @description Type of gasoline (e.g., Regular, Premium, Diesel)
     * @examples ["Regular"]
     */
    gasType: string | null;
}

/**
 * @description A related place suggestion from "People also search for" section
 */
export interface PeopleAlsoSearchSingle {
    /**
     * @description Category of the suggestion (e.g., "People also search for")
     * @examples ["People also search for"]
     */
    category: string | null;
    /**
     * @description Name of the suggested place
     * @examples ["Thornton Park Laundry"]
     */
    title: string | null;
    /**
     * @description Number of reviews for the suggested place
     */
    reviewsCount: number | null;
    /**
     * @description Average rating of the suggested place
     */
    totalScore: number | null;
}

/**
 * @description A customer update or post about the place
 */
export interface UpdateFromCustomer {
    /**
     * @description Text content of the update
     * @examples ["Excellent laundry, clean and fresh environment, new machines and all working"]
     */
    text: string | null;
    /**
     * @description Language code of the update
     * @examples ["en"]
     */
    language: string | null;
    /**
     * @description When the update was posted
     * @examples ["11 months ago"]
     */
    postDate: string | null;
    /**
     * @description Information about who posted the update
     */
    postedBy: {
        /**
         * @description Name of the person who posted
         * @examples ["Aura Toro"]
         */
        name: string | null;
        /**
         * @description URL to the poster's profile
         * @examples ["https://www.google.com/maps/contrib/106833772378732355960?hl=en-US"]
         */
        url: string | null;
        /**
         * @description Title or badge (e.g., "Local Guide")
         * @examples ["Local Guide"]
         */
        title: string | null;
        /**
         * @description Total number of reviews by this person
         */
        totalReviews: number | null;
    };
    /**
     * @description Array of media items (photos/videos) attached to the update
     * @examples [[{"link": "https://lh3.googleusercontent.com/...", "postDate": "11 months ago"}]]
     */
    media: { link: string; postDate: string | null }[];
}

/**
 * @description An update posted by the business owner
 */
export interface OwnerUpdate {
    /**
     * @description Text content of the owner's update
     * @examples ["We are open this fourth of July - because clean never takes a day off!"]
     */
    text: string | null;
    /**
     * @description Text displayed on the action button
     * @examples ["Order online"]
     */
    buttonText: string | null;
    /**
     * @description URL linked to the action button
     * @examples ["http://www.fastfreshlaundry.com/"]
     */
    buttonLink: string | null;
    /**
     * @description Date when the update was posted (ISO 8601 format)
     * @examples ["2025-07-04T21:03:52.000Z"]
     */
    date: string | null;
    /**
     * @description URL of the image attached to the update
     * @examples ["https://lh3.googleusercontent.com/geougc/AF1QipNtZqWouyANvs4cg7qWebqvjZjk1j9hBMDy-Kci=h400-no"]
     */
    imageUrl: string | null;
}

/**
 * @description A hotel booking advertisement
 */
export interface HotelAd {
    /**
     * @description Title or name of the booking provider
     * @examples ["Booking.com"]
     */
    title: string | null;
    /**
     * @description Google redirect URL for the ad
     * @examples ["https://www.google.com/travel/hotels/..."]
     */
    googleUrl: string | null;
    /**
     * @description Direct URL to the booking site
     * @examples ["https://www.booking.com/hotel/..."]
     */
    url: string | null;
    /**
     * @description Displayed price
     * @examples ["$150 per night"]
     */
    price: string | null;
    /**
     * @description Whether this is the hotel's official website
     */
    isOfficialSite: boolean;
}

/**
 * @description Hotel-specific data and information
 */
export interface HotelData {
    /**
     * @description Star rating of the hotel (e.g., "4-star hotel")
     * @examples ["3-star hotel"]
     */
    hotelStars: string | null;
    /**
     * @description Description of the hotel
     * @examples ["Modern hotel with pool and free breakfast"]
     */
    hotelDescription: string | null;
    /**
     * @description Check-in date for the search query
     * @examples ["2025-08-15"]
     */
    checkInDate: string | null;
    /**
     * @description Check-out date for the search query
     * @examples ["2025-08-20"]
     */
    checkOutDate: string | null;
    /**
     * @description Array of similar hotels in the area
     * @examples [[{"name": "Hotel Nearby", "rating": 4.2, "reviews": 150, "description": "Budget hotel", "price": "$89"}]]
     */
    similarHotelsNearby?: {
        /**
         * @description Name of the similar hotel
         * @examples ["Hotel Nearby"]
         */
        name: string | null;
        /**
         * @description Average rating
         */
        rating: number | null;
        /**
         * @description Number of reviews
         */
        reviews: number | null;
        /**
         * @description Brief description
         * @examples ["Budget hotel near downtown"]
         */
        description: string | null;
        /**
         * @description Price per night
         * @examples ["$89"]
         */
        price: string | null;
    }[];
    /**
     * @description Summary of hotel reviews by traveler type
     */
    hotelReviewSummary?: HotelReviewSummary;
    /**
     * @description Array of booking advertisements for the hotel
     * @examples [[{"title": "Booking.com", "price": "$150", "isOfficialSite": false}]]
     */
    hotelAds?: HotelAd[];
}

/**
 * @description Additional information about the place grouped by categories (accessibility, amenities, etc.)
 * @examples [{"Service options": [{"Online estimates": true}, {"Onsite services": true}]}]
 */
export type AdditionalInfo = Record<string, { [key: string]: boolean }[]>;

/**
 * @description Opening hours for all seven days of the week in sorted order
 * @examples [[{"day": "Monday", "hours": "7 AM to 9 PM"}, {"day": "Tuesday", "hours": "7 AM to 9 PM"}, {"day": "Wednesday", "hours": "7 AM to 9 PM"}, {"day": "Thursday", "hours": "7 AM to 9 PM"}, {"day": "Friday", "hours": "7 AM to 9 PM"}, {"day": "Saturday", "hours": "6 AM to 9 PM"}, {"day": "Sunday", "hours": "6 AM to 9 PM"}]]
 */
export type OpeningHours = { day: string; hours: string }[];

/**
 * @description An image of the place with metadata
 */
export type PlaceImage = {
    /**
     * @description URL of the image
     * @examples ["https://lh3.googleusercontent.com/p/AF1QipO46METc51OY74zH4zSLZp2aBWDfyzi-ISukdK1=w426-h240-k-no"]
     */
    imageUrl: string;
    /**
     * @description Name of the person who uploaded the image
     * @examples ["John Smith"]
     */
    authorName?: string;
    /**
     * @description URL to the author's profile
     * @examples ["https://www.google.com/maps/contrib/123456789"]
     */
    authorUrl?: string;
    /**
     * @description When the image was uploaded
     * @examples ["3 months ago"]
     */
    uploadedAt?: string;
};

/**
 * @description Summary of hotel reviews broken down by traveler type
 */
export type HotelReviewSummary = {
    /**
     * @description Overall review summary across all traveler types
     */
    overall?: HotelReviewerGroupSummary;
    /**
     * @description Review summary from business travelers
     */
    bussiness?: HotelReviewerGroupSummary;
    /**
     * @description Review summary from couples
     */
    couples?: HotelReviewerGroupSummary;
    /**
     * @description Review summary from solo travelers
     */
    solo?: HotelReviewerGroupSummary;
    /**
     * @description Review summary from families
     */
    families?: HotelReviewerGroupSummary;
    /**
     * @description Review summary from groups of friends
     */
    friends?: HotelReviewerGroupSummary;
};

/**
 * @description Review summary for a specific traveler group with category breakdowns
 */
export type HotelReviewerGroupSummary = {
    /**
     * @description Overall rating for this traveler group
     */
    rating: number | null;
    /**
     * @description Review summary for rooms
     */
    rooms?: HotelReviewCategorySummary;
    /**
     * @description Review summary for services and facilities
     */
    servicesAndFacilities?: HotelReviewCategorySummary;
    /**
     * @description Review summary for location
     */
    location?: HotelReviewCategorySummary;
};

/**
 * @description Review summary for a specific hotel category
 */
type HotelReviewCategorySummary = {
    /**
     * @description Average rating for this category
     */
    rating: number | null;
    /**
     * @description Array of review excerpts mentioning this category
     * @examples [["Clean and spacious", "Very comfortable beds"]]
     */
    reviews: string[];
};

/**
 * @description Information about a table reservation service provider
 */
export type TableReservationProvider = {
    /**
     * @description Name of the reservation provider
     * @examples ["OpenTable"]
     */
    name: string | null;
    /**
     * @description Email address of the provider
     * @examples ["reservations@example.com"]
     */
    email: string | null;
    /**
     * @description Phone number of the provider
     * @examples ["+1-555-123-4567"]
     */
    phone: string | null;
    /**
     * @description Address of the provider
     * @examples ["123 Main St, New York, NY"]
     */
    address: string | null;
    /**
     * @description URL to make a table reservation
     * @examples ["https://www.opentable.com/restaurant/profile/12345"]
     */
    reserveTableUrl: string;
};

export type PlaceWithCategories = Pick<TrimmedPlace, "categories"> &
    Partial<Pick<TrimmedPlace, "url">>;

/**
 * @description Trimmed place data with essential information (from search results)
 */
export type TrimmedPlace = AddressParsed & {
    /**
     * @description Name/title of the place
     * @examples ["Crystal Clean Laundromat"]
     */
    title: string;

    /**
     * @description Unique Google Place ID
     * @examples ["ChIJ9ckBii1754gRk8w_xAu7tTA"]
     */
    placeId: string;

    /**
     * @description Full address of the place
     * @examples ["1408 S Crystal Lake Dr, Orlando, FL 32806"]
     */
    address: string | null;

    /**
     * @description Geographic coordinates (latitude and longitude)
     * @examples [{"lat": 28.525325, "lng": -81.3437558}]
     */
    location: Coordinates | null;

    /**
     * @description Array of category names for the place
     * @examples [["Laundromat", "Clothing alteration service", "Dry cleaner"]]
     */
    categories: string[];

    /**
     * @description Whether this place is a paid advertisement
     */
    isAdvertisement: boolean;

    /**
     * @description Primary category name
     * @examples ["Laundromat"]
     */
    categoryName: string | null;

    /**
     * @description Average rating score (0-5)
     */
    totalScore: number | null;

    /**
     * @description Whether the place is permanently closed
     */
    permanentlyClosed: boolean;

    /**
     * @description Whether the place is temporarily closed
     */
    temporarilyClosed: boolean;

    /**
     * @description Total number of reviews
     */
    reviewsCount: number | null;

    /**
     * @description Google Maps URL for the place
     * @examples ["https://www.google.com/maps/search/?api=1&query=Crystal%20Clean%20Laundromat&query_place_id=ChIJ9ckBii1754gRk8w_xAu7tTA"]
     */
    url: string;

    /**
     * @description Price level indicator (e.g., "$", "$$", "$$$")
     * @examples ["$$"]
     */
    price: string | null;

    /**
     * @description Google CID (Customer ID) - numeric identifier
     * @examples ["3509917143816719507"]
     */
    cid: string | null;

    /**
     * @description Feature ID - More info at https://dataforseo.com/help-center/what-is-cid-place-id-feature-id
     * @examples ["0x88e77b2d8a01c9f5:0x30b5bb0bc43fcc93"]
     */
    fid: string | null;

    /**
     * @description URL of the main place image
     * @examples ["https://lh3.googleusercontent.com/p/AF1QipO46METc51OY74zH4zSLZp2aBWDfyzi-ISukdK1=w426-h240-k-no"]
     */
    imageUrl: string | null;

    /**
     * @description Hotel star rating (for hotels)
     * @examples ["3-star hotel"]
     */
    hotelStars: string | null;

    /**
     * @description Timestamp when the data was scraped (ISO 8601)
     * @examples ["2025-12-11T20:48:53.297Z"]
     */
    scrapedAt: string;

    /**
     * @description URL of the search page where this place was found
     * @examples ["https://www.google.com/maps/search/laundromat+near+orlando"]
     */
    searchPageUrl?: string;

    /**
     * @description Search query used to find this place
     * @examples ["laundromat near orlando"]
     */
    searchString?: string;

    /**
     * @description Place ID from the input if specified
     * @examples ["ChIJ9ckBii1754gRk8w_xAu7tTA"]
     */
    inputPlaceId?: string;

    /**
     * @description Start URL from the input if specified
     * @examples ["https://www.google.com/maps/place/..."]
     */
    inputStartUrl?: string;

    /**
     * @description Language code used for scraping
     * @examples ["en"]
     */
    language: string;

    /**
     * @description Position in search results (1-based)
     */
    rank?: number;

    /**
     * @description Google Knowledge Graph ID
     * @examples ["/g/11b6q62wr1"]
     */
    kgmid: string | null;
};

/**
 * @description Place data extracted from search page with basic details
 */
export interface SearchPagePlace extends ContactDetails, TrimmedPlace {
    /**
     * @description Brief description of the place
     * @examples ["Full-service laundromat with modern equipment and free WiFi"]
     */
    description: string | null;

    /**
     * @description Formatted phone number
     * @examples ["(407) 896-9355"]
     */
    phone: string | null;

    /**
     * @description Unformatted phone number with country code
     * @examples ["+14078969355"]
     */
    phoneUnformatted: string | null;

    /**
     * @description Total number of images available
     */
    imagesCount: number;

    /**
     * @description Opening hours for each day of the week
     * @examples [[{"day": "Monday", "hours": "7 AM to 9 PM"}, {"day": "Tuesday", "hours": "7 AM to 9 PM"}]]
     */
    openingHours: OpeningHours | undefined;

    /**
     * @description Additional opening hours for specific services (e.g., delivery, pickup)
     * @examples [{"Delivery": [{"day": "Monday", "hours": "9 AM–6 PM"}]}]
     */
    additionalOpeningHours?: Record<string, OpeningHours> | undefined;

    /**
     * @description Whether the business can be claimed by its owner
     */
    claimThisBusiness?: boolean;

    /**
     * @description Related places suggested by Google
     * @examples [[{"category": "People also search for", "title": "Thornton Park Laundry", "reviewsCount": 92, "totalScore": 3.7}]]
     */
    peopleAlsoSearch: PeopleAlsoSearchSingle[] | undefined;

    /**
     * @description Additional information grouped by categories (accessibility, amenities, etc.)
     * @examples [{"Service options": [{"Online estimates": true}]}]
     */
    additionalInfo: AdditionalInfo | undefined;

    /**
     * @description Tags extracted from reviews
     * @examples [[{"title": "coffee", "count": 67}, {"title": "cookies", "count": 47}]]
     */
    reviewsTags?: Tag[];

    /**
     * @description Tags related to the place itself
     * @examples [[{"title": "family-friendly", "count": 10}]]
     */
    placesTags?: Tag[];

    /**
     * @description Categories available in the image gallery
     * @examples [["All", "Latest", "Videos", "Exterior", "Inside"]]
     */
    imageCategories: string[];

    /**
     * @description Gas prices (for gas stations)
     * @examples [[{"priceTag": "$3.45", "gasType": "Regular", "price": 3.45}]]
     */
    gasPrices: GasPrice[];

    /**
     * @description URL for making table reservations
     * @examples ["https://www.opentable.com/restaurant/profile/12345"]
     */
    reserveTableUrl: string | null;

    /**
     * @description Google Food ordering URL
     * @examples ["https://food.google.com/chooseprovider?restaurantId=..."]
     */
    googleFoodUrl?: string | null;

    /**
     * @description Official website of the place
     * @examples ["https://www.fastfreshlaundry.com/locations/crystal-clean-laundromat/"]
     */
    website?: string;

    /**
     * @description Enriched leads data from external sources
     * @examples [[{"firstName": "John", "lastName": "Doe", "jobTitle": "Manager", "email": "john@example.com"}]]
     */
    leadsEnrichment?: LeadsEnrichmentResult[];

    /**
     * @description URL of the parent place (for places within other places)
     * @examples ["https://www.google.com/maps/place/Shopping+Mall/..."]
     */
    parentPlaceUrl?: string;
}

/**
 * @description Complete place data from the detail page with all available information
 */
export type DetailPagePlace = PopularTimesOutput & {
    /**
     * @description Subtitle or secondary name
     * @examples ["Downtown location"]
     */
    subTitle: string | null;

    // This field would ideally be named `menuLink` (to mirror `servicesLink`),
    // but is kept as `menu` for backwards compatibility with existing consumers.
    /**
     * @description URL to the menu (for restaurants)
     * @examples ["https://example.com/menu.pdf"]
     */
    menu: string | null;

    /**
     * @description URL to book services or appointments (for service businesses like barbershops, spas)
     * @examples ["https://example.com/book"]
     */
    servicesLink: string | null;

    /**
     * @description Name of the location where this place is situated
     * @examples ["Terminal 3, Orlando International Airport"]
     */
    locatedIn: string | null;

    /**
     * @description Floor number or level
     * @examples ["2nd floor"]
     */
    floor: string | null;

    /**
     * @description Plus Code for the location
     * @examples ["GMG4+4F Orlando, Florida"]
     */
    plusCode: string | null;

    /**
     * @description Distribution of reviews across star ratings
     * @examples [{"oneStar": 24, "twoStar": 10, "threeStar": 17, "fourStar": 50, "fiveStar": 720}]
     */
    reviewsDistribution: ReviewsDistribution | undefined;

    /**
     * @description Questions and answers from the Q&A section
     * @examples [[{"question": "Do they accept credit cards?", "answers": [{"answer": "Yes", "answerDate": "2 months ago"}]}]]
     */
    questionsAndAnswers: QuestionAndAnswers[] | QuestionAndAnswers | undefined;

    /**
     * @description Latest update posted by a customer
     * @examples [{"text": "Great service!", "language": "en", "postDate": "1 week ago"}]
     */
    updatesFromCustomers: UpdateFromCustomer | undefined;

    /**
     * @description Confirmation text about opening hours from the business
     * @examples ["Hours updated 2 weeks ago"]
     */
    openingHoursBusinessConfirmationText?: string;
} & HotelData &
    SearchPagePlace;

/**
 * @description Place data from an external service (e.g., Tripadvisor) integrated into Google Maps
 */
export interface ExternalDetailedPlace extends DetailPagePlace {
    /**
     * @description Whether this place data comes from an external service
     */
    isExternalServicePlace?: boolean;

    /**
     * @description Name of the external service provider
     * @examples ["Tripadvisor"]
     */
    externalServiceProvider?: string | null;

    /**
     * @description Identifier in the external service
     * @examples ["d123456"]
     */
    externalId?: string;
}

/**
 * @description Additional place data not available in standard scraping
 */
export interface ExtraPlaceData {
    /**
     * @description Web search results related to the place
     * @examples [[{"title": "Crystal Clean Laundromat", "url": "https://example.com", "description": "Laundromat services"}]]
     */
    webResults: WebResult[];

    /**
     * @description User's personal note about the place
     * @examples ["My favorite laundromat"]
     */
    userPlaceNote: string | undefined;

    /**
     * @description Links for table reservations
     * @examples [[{"name": "OpenTable", "url": "https://www.opentable.com/r/restaurant"}]]
     */
    tableReservationLinks: Link[];

    /**
     * @description Links for booking (hotels, tours, etc.)
     * @examples [[{"name": "fastfreshlaundry.com", "url": "https://www.fastfreshlaundry.com/pickup-and-delivery/"}]]
     */
    bookingLinks: Link[];

    /**
     * @description Online ordering options (pickup and delivery). Omitted unless `scrapeOrderOnline` is enabled. Note: Google may also omit this data in ~5% of cases.
     * @examples [{"pickUps": [{"name": "Pickup", "orderUrl": "https://example.com/pickup"}], "deliveries": [{"name": "Delivery", "url": "https://example.com/delivery", "deliveryFees": "$5", "deliveryTime": "30-45 min"}]}]
     */
    orderOnline?: {
        /**
         * @description Pickup options
         */
        pickUps: PickUpItem[];
        /**
         * @description Delivery options
         */
        deliveries: DeliveryItem[];
    };

    /**
     * @description Questions and answers from the Q&A section
     * @examples [[{"question": "Is parking available?", "answers": [{"answer": "Yes, free parking", "answerDate": "1 month ago"}]}]]
     */
    questionsAndAnswers: QuestionAndAnswers[] | undefined;

    /**
     * @description Updates posted by the business owner
     * @examples [[{"text": "Now open on Sundays!", "date": "2025-06-15T10:00:00.000Z"}]]
     */
    ownerUpdates: OwnerUpdate[];

    /**
     * @description Restaurant-specific data
     */
    restaurantData: {
        /**
         * @description Table reservation provider information
         */
        tableReservationProvider: TableReservationProvider | undefined | null;
    };

    /**
     * @description Total number of reviews
     */
    reviewsCount: number | null;
}

export type SearchPlaceParams = Pick<
    SearchPagePlace,
    | "searchPageUrl"
    | "searchString"
    | "rank"
    | "language"
    | "parentPlaceUrl"
    | "inputPlaceId"
    | "inputStartUrl"
> &
    Partial<Pick<SearchPagePlace, "isAdvertisement">>;

export type SearchPlacesJsonData = {
    placesPaginationData: (DetailPagePlace | ExternalDetailedPlace)[];
    placeListLength: number | null;
    error: string | null;
};

/**
 * @description Complete review with full place details
 */
export interface ReviewWithPlaceDetails extends Review, TrimmedPlace {}

/**
 * @description Contact details and social media profiles for a place
 */
export type ContactDetails = SocialMediaProfiles & {
    /**
     * @description Array of email addresses found
     * @examples [["info@example.com", "support@example.com"]]
     */
    emails?: string[];

    /**
     * @description Array of phone numbers found
     * @examples [["+1-555-123-4567", "+1-555-987-6543"]]
     */
    phones?: string[];

    /**
     * @description Array of uncertain/possible phone numbers
     * @examples [["+1-555-000-0000"]]
     */
    phonesUncertain?: string[];

    /**
     * @description Array of LinkedIn profile URLs
     * @examples [["https://www.linkedin.com/company/example"]]
     */
    linkedIns?: string[];

    /**
     * @description Array of Twitter profile URLs
     * @examples [["https://twitter.com/example"]]
     */
    twitters?: string[];

    /**
     * @description Array of Instagram profile URLs
     * @examples [["https://www.instagram.com/example/"]]
     */
    instagrams?: string[];

    /**
     * @description Array of Facebook profile URLs
     * @examples [["https://www.facebook.com/example"]]
     */
    facebooks?: string[];

    /**
     * @description Array of YouTube channel URLs
     * @examples [["https://www.youtube.com/channel/example"]]
     */
    youtubes?: string[];

    /**
     * @description Array of TikTok profile URLs
     * @examples [["https://www.tiktok.com/@example"]]
     */
    tiktoks?: string[];

    /**
     * @description Array of Pinterest profile URLs
     * @examples [["https://www.pinterest.com/example/"]]
     */
    pinterests?: string[];

    /**
     * @description Array of Discord server URLs
     * @examples [["https://discord.gg/example"]]
     */
    discords?: string[];

    /**
     * @description website's domain from which the contacts were scraped.
     * @examples [["example.com"]]
     * @hidden only one user needs this https://github.com/apify-store/google-maps/issues/1761, we don't show it in dataset schema
     */
    domain?: string;
};

/**
 * @description Result of image extraction containing URLs and metadata
 */
export type ExtractImagesResult = {
    /**
     * @description Array of image URLs
     * @examples [["https://lh3.googleusercontent.com/p/AF1QipO46METc51OY74zH4zSLZp2aBWDfyzi-ISukdK1=w426-h240-k-no"]]
     */
    imageUrls: string[] | undefined;

    /**
     * @description Array of images with metadata
     * @examples [[{"imageUrl": "https://example.com/image.jpg", "authorName": "John Doe", "uploadedAt": "2 months ago"}]]
     */
    images?: PlaceImage[] | undefined;
};

/**
 * @description Union type representing any type of place data
 */
export type Place = SearchPagePlace | DetailPagePlace | ExternalDetailedPlace;

/**
 * @description Verification information about given email
 */
interface EmailVerificationItem {
    /**
     * @description Email this verification is for
     * @examples ["john.doe@example.com"]
     */
    email: string;
    /**
     * @description Quality classification of the email address
     * @examples ["good"]
     */
    quality: "" | "good" | "bad" | "risky" | "unknown";
    /**
     * @description Verification result status
     * @examples ["ok"]
     */
    result: "ok" | "catch_all" | "unknown" | "error" | "disposable" | "invalid";
    /**
     * @description Detailed sub-result providing additional verification context
     * @examples ["mailbox_verified"]
     */
    subResult: string;
    /**
     * @description Whether the email is from a free email provider
     */
    free: boolean;
    /**
     * @description Whether the email is a role-based address (e.g., info@, support@)
     */
    role: boolean;
    /**
     * @description Error message if verification failed, empty string otherwise
     * @examples [""]
     */
    error: string;
}

/**
 * @description Enriched lead information from external data sources
 */
export interface LeadsEnrichmentResult {
    /**
     * @description Unique identifier for the person
     * @examples ["5f9b3f3e4f3b9a001f3e4b1a"]
     */
    personId: string;

    /**
     * @description First name
     * @examples ["John"]
     */
    firstName: string | null;

    /**
     * @description Last name
     * @examples ["Doe"]
     */
    lastName: string | null;

    /**
     * @description Full name
     * @examples ["John Doe"]
     */
    fullName: string | null;

    /**
     * @description LinkedIn profile URL
     * @examples ["https://www.linkedin.com/in/johndoe"]
     */
    linkedinProfile: string | null;

    /**
     * @description Email address
     * @examples ["john.doe@example.com"]
     */
    email: string | null;

    /**
     * @description Mobile phone number
     * @examples ["+1-555-123-4567"]
     */
    mobileNumber: string | null;

    /**
     * @description Job title
     * @examples ["Marketing Manager"]
     */
    jobTitle: string | null;

    /**
     * @description Industry sector
     * @examples ["Technology"]
     */
    industry: string | null;

    /**
     * @description City of residence
     * @examples ["San Francisco"]
     */
    city: string | null;

    /**
     * @description State or province
     * @examples ["California"]
     */
    state: string | null;

    /**
     * @description Country
     * @examples ["United States"]
     */
    country: string | null;

    /**
     * @description Unique identifier for the company
     * @examples ["5f9b3f3e4f3b9a001f3e4b1b"]
     */
    companyId: string | null;

    /**
     * @description Company name
     * @examples ["Acme Corporation"]
     */
    companyName: string | null;

    /**
     * @description Company website URL
     * @examples ["https://www.acmecorp.com"]
     */
    companyWebsite: string | null;

    /**
     * @description Size range of the company
     * @examples ["100-500 employees"]
     */
    companySize: string | null;

    /**
     * @description Company LinkedIn profile URL
     * @examples ["https://www.linkedin.com/company/acmecorp"]
     */
    companyLinkedin: string | null;

    /**
     * @description City where company is located
     * @examples ["New York"]
     */
    companyCity: string | null;

    /**
     * @description State where company is located
     * @examples ["New York"]
     */
    companyState: string | null;

    /**
     * @description Country where company is located
     * @examples ["United States"]
     */
    companyCountry: string | null;

    /**
     * @description Company phone number
     * @examples ["+1-555-987-6543"]
     */
    companyPhoneNumber: string | null;

    /**
     * @description Professional headline
     * @examples ["Experienced Marketing Professional"]
     */
    headline: string | null;

    /**
     * @description Departments the person is associated with
     * @examples [["Marketing", "Sales"]]
     */
    departments: string[];

    /**
     * @description Seniority level
     * @examples ["Manager"]
     */
    seniority: string | null;

    /**
     * @description URL to profile photo
     * @examples ["https://media.licdn.com/dms/image/..."]
     */
    photoUrl: string | null;

    /**
     * @description Twitter profile URL
     * @examples ["https://twitter.com/johndoe"]
     */
    twitter: string | null;

    /**
     * @description Email verification result for a given email if it was enabled
     * @examples [{"email": "john@example.com", "quality": "good", "result": "ok", "subResult": "mailbox_verified", "free": false, "role": false, "error": ""}]
     */
    emailVerification?: EmailVerificationItem;
}

/**
 * @description This represents scraped social media profile. We don't care much about its fields in this actor so we define it as unknown
 */
type SocialMediaProfile = unknown;

/**
 * @description Collection of social media profiles for a place
 */
export type SocialMediaProfiles = {
    /**
     * @description Array of Facebook profile data
     * @examples [[{"url": "https://www.facebook.com/example", "likes": 1000}]]
     */
    facebookProfiles?: SocialMediaProfile[];

    /**
     * @description Array of Instagram profile data
     * @examples [[{"url": "https://www.instagram.com/example/", "followers": 5000}]]
     */
    instagramProfiles?: SocialMediaProfile[];

    /**
     * @description Array of YouTube profile data
     * @examples [[{"url": "https://www.youtube.com/channel/example", "subscribers": 10000}]]
     */
    youtubeProfiles?: SocialMediaProfile[];

    /**
     * @description Array of TikTok profile data
     * @examples [[{"url": "https://www.tiktok.com/@example", "followers": 20000}]]
     */
    tiktokProfiles?: SocialMediaProfile[];

    /**
     * @description Array of Twitter profile data
     * @examples [[{"url": "https://twitter.com/example", "followers": 3000}]]
     */
    twitterProfiles?: SocialMediaProfile[];
};

/**
 * @description Information about a pickup ordering option
 */
export type PickUpItem = {
    /**
     * @description Name of the pickup service
     * @examples ["Uber Eats"]
     */
    name: string | null;

    /**
     * @description URL to the service website
     * @examples ["https://www.ubereats.com"]
     */
    url: string | null;

    /**
     * @description Direct URL to place an order
     * @examples ["https://www.ubereats.com/store/example-restaurant"]
     */
    orderUrl: string;

    /**
     * @description Estimated pickup time
     * @examples ["15-25 min"]
     */
    pickUpTime: string | null;

    /**
     * @description Pickup fees
     * @examples ["$2.99"]
     */
    pickUpFees: string | null;
};

/**
 * @description Information about a delivery ordering option
 */
export type DeliveryItem = {
    /**
     * @description Name of the delivery service
     * @examples ["DoorDash"]
     */
    name: string | null;

    /**
     * @description URL to the service website
     * @examples ["https://www.doordash.com"]
     */
    url: string;

    /**
     * @description Delivery fees
     * @examples ["$5.99"]
     */
    deliveryFees: string | null;

    /**
     * @description Estimated delivery time
     * @examples ["30-45 min"]
     */
    deliveryTime: string | null;
};

/**
 * @description A simple link with name and URL
 */
export type Link = {
    /**
     * @description Display name for the link
     * @examples ["fastfreshlaundry.com"]
     */
    name?: string;

    /**
     * @description [URL of the link]
     * @examples ["https://www.fastfreshlaundry.com/pickup-and-delivery/"]
     */
    url: string;
};
