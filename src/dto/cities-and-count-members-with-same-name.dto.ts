import { ApiProperty } from '@nestjs/swagger';

type Members = {
  first_name: string;
  count: string;
};

export class CitiesAndCountMembersWithSameName {
  @ApiProperty({
    example: 'Warsaw',
  })
  city: string;
  @ApiProperty({
    example: [
      {
        first_name: 'Egor',
        count: '1',
      },
    ],
  })
  members: [Members];
}
