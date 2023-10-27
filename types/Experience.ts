export type ExperienceType = {
    begin: Date;
    end?: Date;
    jobTitle: string;
    companyName: string;
    location: { city: string; country: string };
    description?: string;
};
