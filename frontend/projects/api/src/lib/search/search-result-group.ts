import { SearchContentGroup } from './search-content-group';
import { SearchExpertGroup } from './search-expert-group';

/** The results of one type, told apart by `type`. */
export type SearchResultGroup = SearchContentGroup | SearchExpertGroup;
