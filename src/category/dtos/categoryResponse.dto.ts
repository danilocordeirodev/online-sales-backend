import { CategoryEntity } from '../entities/category.entity';

export class CategoryResponseDto {
  id: number;
  name: string;

  constructor(categoEntity: CategoryEntity) {
    this.id = categoEntity.id;
    this.name = categoEntity.name;
  }
}
