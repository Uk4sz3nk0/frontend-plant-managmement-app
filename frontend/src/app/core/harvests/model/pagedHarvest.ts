/**
 * Harvests specification
 * Harvests specification
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { PageDto } from './page';
import { HarvestDto } from './harvest';


export interface PagedHarvestDto { 
    data?: Array<HarvestDto>;
    page?: PageDto;
}

