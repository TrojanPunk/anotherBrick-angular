export interface ISignupData {
    username: string;
    email: string;
    password: string;
    roles: string;
}

export interface IPostSignUpData {
    username: string;
    email: string;
    password: string;
    roles: string[];
}

export interface ISigninData {
    username: string;
    password: string;
}

export interface IGetUserAccessToken {
    accessToken: string;
    email: string;
    id: string;
    roles: string[];
    tokenType: string;
    username: string;
}

export interface IUseUserAccessToken {
    accessToken: string;
    email: string;
    id: string;
    roles: string;
    tokenType: string;
    username: string;
}

export interface IAccessTokenAndId {
    accessToken: string;
    id: string;
}

export interface ISeller {
    sellerName: string;
    sellerMobile: number;
    sellerEmail: string;
}

export interface IFeatures {
    bhk: number;
    baths: number;
    
    parking: number;
}

export interface ILocation {
    state: string;
    city: string;
    pincode: number;
    address: string;
}

export interface IPropertyData {
    propertyName: string;
    seller: ISeller;
    location: ILocation;
    features: IFeatures;
    price: number;
    ratings: number;
    images: string[];
    category: string;
    id: string;
    maxPrice: number;
    minPrice: number;
    area: number;
}

export interface IFilterData {
    price: number;
    minPrice: number;
    maxPrice: number;
    category: string;
    area: number;
}