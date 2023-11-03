import { ApiProperty } from '@nestjs/swagger';

export class CitiesWithCountDto {
  @ApiProperty({
    example: 'Warsaw',
  })
  city: string;
  @ApiProperty({
    example: '1',
  })
  count: string;
}
