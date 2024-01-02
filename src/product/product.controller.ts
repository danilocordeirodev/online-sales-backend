import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ProductService } from './product.service';
import { ProductResponseDto } from './dtos/productResponse.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<ProductResponseDto[]> {
    return (await this.productService.findAll()).map(
      (product) => new ProductResponseDto(product),
    );
  }
}
