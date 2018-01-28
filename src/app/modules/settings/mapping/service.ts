
import {MappingIndicator} from './indicator';
export interface MappedService {
  serviceId: string;
  serviceName: string;
  indicators: Array<MappingIndicator>;
}
