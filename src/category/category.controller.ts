import { Controller, Get } from '@nestjs/common';
import { CategoryResponseDto } from './dtos/categoryResponse.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<CategoryResponseDto[]> {
    return (await this.categoryService.findAllCategories()).map(
      (category) => new CategoryResponseDto(category),
    );
  }
}
