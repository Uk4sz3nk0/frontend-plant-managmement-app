/**
 * Plant specification
 * Plant specification
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { PlantVarietyDto } from './plantVariety';
import { PageDto } from './page';


export interface PagedPlantVarietiesDto { 
    data?: Array<PlantVarietyDto>;
    page?: PageDto;
}
