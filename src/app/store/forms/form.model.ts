import {Section} from '../../shared/models/section';

export interface Form {
  name: string;
  id: string;
  datasetId: string;
  periodType: string;
  sections: Section[ ];
}
