// *************
// *** TYPES ***
// *************

type TextObject = {
    type?: string;
    language?: string;
    text?: string;
}

type Url = {
    type?: string;
    url?: string;
}


type ComicSummary = {
    resourceURI?: string;
    name?: string;
}

type ComicDate = {
    type?: string;
    date?: string;
}

type ComicPrice = {
    type?: string;
    price?: number;
}

type Image = {
    path?: string;
    extension?: string;
}

type CreatorSummary = {
    resourceURI?: string;
    name?: string;
    role?: string;
}

type CreatorList = {
    available?: number;
    returned?: number;
    collectionURI?: string;
    items?: CreatorSummary[];
}

type CharacterSummary = {
    resourceURI?: string;
    name?: string;
    role?: string;
}

type CharacterList = {
    available?: number;
    returned?: number;
    items?: CharacterSummary[];
}

type StorySummary = {
    resourceURI?: string;
    name?: string;
    type?: string;
}

type StoryList = {
    available?: number;
    returned?: number;
    collectionURI?: string;
    items?: StorySummary[];
}

type EventSummary = {
    resourceURI?: string;
    name?: string;
}

type EventList = {
    available?: number;
    returned?: number;
    collectionURI?: string;
    items?: EventSummary[];
}

type ComicList = {
    available?: number;
    returned?: number;
    collectionURI?: string;
    items?: ComicSummary[];
}

type Series = {
    resourceURI?: string;
    name?: string;
    available?: number;
    returned?: number;
    collectionURI?: string;
    items?: {
        resourceURI?: string;
        name?: string;
    }
}

type Card = {
    id?: number;
    digitalId?: number;
    name?: string;
    title?: string;
    issueNumber?: number;
    variantDescription?: string;
    description?: string;
    modified?: string;
    isbn?: string;
    upc?: string;
    diamondCode?: string;
    ean?: string;
    issn?: string;
    format?: string;
    pageCount?: number;
    textObjects?: TextObject[];
    resourceURI?: string;
    urls?: Url[];
    variants?: ComicSummary[];
    collections?: ComicSummary[];
    collectedIssues?: ComicSummary[];
    dates?: ComicDate[];
    prices?: ComicPrice[];
    thumbnail?: Image;
    images?: Image[];
    creators?: CreatorList;
    characters?: CharacterList;
    stories?: StoryList;
    events?: EventList;
    comics?: ComicList;
    series?: Series;
}