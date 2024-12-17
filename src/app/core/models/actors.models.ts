export interface CastMember {
    id: number;
    name: string;
    original_name: string;
    character: string;
    gender: number;
    popularity: number;
    profile_path: string;
    known_for_department: string;
    picture_path: string;
  }

export interface ActorDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
  picture_path: string;
}

  