import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryColumn({ type: 'uuid', name: 'uuid' })
  uuid: string;

  @Column({ type: 'varchar', name: 'title', length: '100' })
  title: string;

  @Column({ type: 'text', name: 'details' })
  details: string | null;

  @Column({ type: 'timestamp', name: 'created_at', default: 'now()' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
