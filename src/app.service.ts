import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from './database/database.module';
import { Pool } from 'pg';

@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private db: Pool) {}

  async getCitiesWithCount(): Promise<any> {
    const res = await this.db.query(`
    SELECT c.name AS city, COUNT(r.id) AS count
    FROM cities c
    LEFT JOIN residents r ON c.id = r.city_id
    GROUP BY c.name
    ORDER BY count DESC;`);
    return res.rows;
  }
  async getCitiesAndCountMembersWithSameName(): Promise<any> {
    const result = await this.db.query(`
    SELECT
      city,
      json_agg(json_build_object('first_name', first_name, 'count', member_count)) AS members
    FROM (
        SELECT
            c.name AS city,
            r.first_name,
            COUNT(*) AS member_count
        FROM cities c
        LEFT JOIN residents r ON c.id = r.city_id
        GROUP BY c.name, r.first_name
    ) subquery
    GROUP BY city
    ORDER BY city;`);
    return result.rows;
  }
}
