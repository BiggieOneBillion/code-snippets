import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with mock data...');

  // Clear existing data
  await prisma.entry.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  // Create demo users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice Johnson',
      password: hashedPassword,
    },
  });

  const user22 = await prisma.user.create({
    data: {
      email: 'pappy.kay9@gmail.com',
      name: 'Pappy Kay',
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob Smith',
      password: hashedPassword,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'charlie@example.com',
      name: 'Charlie Davis',
      password: hashedPassword,
    },
  });

  console.log('✅ Created 3 demo users');

  // Create projects for Alice
  const aliceProject1 = await prisma.project.create({
    data: {
      name: 'React Hooks Collection',
      description: 'A collection of custom React hooks for common use cases',
      userId: user1.id,
    },
  });

  const pappyProject22 = await prisma.project.create({
    data: {
      name: 'React Hooks Collection',
      description: 'A collection of custom React hooks for common use cases',
      userId: user22.id,
    },
  });

  const aliceProject2 = await prisma.project.create({
    data: {
      name: 'API Documentation',
      description: 'REST API documentation and examples',
      userId: user1.id,
    },
  });

  // Create projects for Bob
  const bobProject1 = await prisma.project.create({
    data: {
      name: 'Python Utilities',
      description: 'Useful Python utility functions',
      userId: user2.id,
    },
  });

  // Create projects for Charlie
  const charlieProject1 = await prisma.project.create({
    data: {
      name: 'TypeScript Tips',
      description: 'Advanced TypeScript patterns and tips',
      userId: user3.id,
    },
  });

  console.log('✅ Created 4 demo projects');

  // Create public code snippets
  await prisma.entry.create({
    data: {
      title: 'useDebounce Hook',
      content: `import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
      type: 'CODE',
      language: 'typescript',
      isPublic: true,
      projectId: aliceProject1.id,
      userId: user1.id,
    },
  });

  await prisma.entry.create({
    data: {
      title: 'useLocalStorage Hook',
      content: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}`,
      type: 'CODE',
      language: 'typescript',
      isPublic: true,
      projectId: aliceProject1.id,
      userId: user1.id,
    },
  });

  await prisma.entry.create({
    data: {
      title: 'REST API Best Practices',
      content: `# REST API Best Practices

## 1. Use Proper HTTP Methods

- **GET**: Retrieve resources
- **POST**: Create new resources
- **PUT**: Update entire resources
- **PATCH**: Partial updates
- **DELETE**: Remove resources

## 2. Use Meaningful Resource Names

\`\`\`
✅ Good: /api/users/123/posts
❌ Bad: /api/getUserPosts?id=123
\`\`\`

## 3. Version Your API

Always version your API to maintain backward compatibility:

\`\`\`
/api/v1/users
/api/v2/users
\`\`\`

## 4. Use Proper Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **404**: Not Found
- **500**: Server Error

## 5. Implement Pagination

For large datasets, always implement pagination:

\`\`\`json
{
  "data": [...],
  "page": 1,
  "pageSize": 20,
  "total": 100
}
\`\`\``,
      type: 'MARKDOWN',
      isPublic: true,
      projectId: aliceProject2.id,
      userId: user1.id,
    },
  });

  await prisma.entry.create({
    data: {
      title: 'REST API Best Practices',
      content: `# REST API Best Practices

## 1. Use Proper HTTP Methods

- **GET**: Retrieve resources
- **POST**: Create new resources
- **PUT**: Update entire resources
- **PATCH**: Partial updates
- **DELETE**: Remove resources

## 2. Use Meaningful Resource Names

\`\`\`
✅ Good: /api/users/123/posts
❌ Bad: /api/getUserPosts?id=123
\`\`\`

## 3. Version Your API

Always version your API to maintain backward compatibility:

\`\`\`
/api/v1/users
/api/v2/users
\`\`\`

## 4. Use Proper Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **404**: Not Found
- **500**: Server Error

## 5. Implement Pagination

For large datasets, always implement pagination:

\`\`\`json
{
  "data": [...],
  "page": 1,
  "pageSize": 20,
  "total": 100
}
\`\`\``,
      type: 'MARKDOWN',
      isPublic: true,
      projectId: pappyProject22.id,
      userId: user22.id,
    },
  });

  await prisma.entry.create({
    data: {
      title: 'File Path Utilities',
      content: `import os
from pathlib import Path
from typing import List

def get_all_files(directory: str, extension: str = None) -> List[str]:
    """
    Recursively get all files in a directory.
    
    Args:
        directory: Root directory to search
        extension: Optional file extension filter (e.g., '.py')
    
    Returns:
        List of file paths
    """
    files = []
    for root, _, filenames in os.walk(directory):
        for filename in filenames:
            if extension is None or filename.endswith(extension):
                files.append(os.path.join(root, filename))
    return files

def ensure_directory(path: str) -> None:
    """Create directory if it doesn't exist."""
    Path(path).mkdir(parents=True, exist_ok=True)

def get_file_size(filepath: str) -> int:
    """Get file size in bytes."""
    return os.path.getsize(filepath)`,
      type: 'CODE',
      language: 'python',
      isPublic: true,
      projectId: bobProject1.id,
      userId: user2.id,
    },
  });

  await prisma.entry.create({
    data: {
      title: 'Advanced TypeScript Generics',
      content: `# Advanced TypeScript Generics

## Generic Constraints

You can constrain generics to specific types:

\`\`\`typescript
interface HasId {
  id: string;
}

function findById<T extends HasId>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}
\`\`\`

## Conditional Types

Create types that depend on conditions:

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
\`\`\`

## Mapped Types

Transform existing types:

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};
\`\`\`

## Utility Types

TypeScript provides many built-in utility types:

- \`Partial<T>\`: Make all properties optional
- \`Required<T>\`: Make all properties required
- \`Pick<T, K>\`: Select specific properties
- \`Omit<T, K>\`: Exclude specific properties
- \`Record<K, T>\`: Create object type with specific keys`,
      type: 'MARKDOWN',
      isPublic: true,
      projectId: charlieProject1.id,
      userId: user3.id,
    },
  });

  await prisma.entry.create({
    data: {
      title: 'Type-Safe Event Emitter',
      content: `type EventMap = Record<string, any>;

type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;

class TypedEventEmitter<T extends EventMap> {
  private listeners: {
    [K in keyof T]?: Array<EventReceiver<T[K]>>;
  } = {};

  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName]!.push(fn);
  }

  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void {
    const listeners = this.listeners[eventName];
    if (!listeners) return;
    
    const index = listeners.indexOf(fn);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  emit<K extends EventKey<T>>(eventName: K, params: T[K]): void {
    const listeners = this.listeners[eventName];
    if (!listeners) return;
    
    listeners.forEach(fn => fn(params));
  }
}

// Usage
interface MyEvents {
  userLoggedIn: { userId: string; timestamp: Date };
  dataUpdated: { id: string; data: any };
}

const emitter = new TypedEventEmitter<MyEvents>();

emitter.on('userLoggedIn', ({ userId, timestamp }) => {
  console.log(\`User \${userId} logged in at \${timestamp}\`);
});`,
      type: 'CODE',
      language: 'typescript',
      isPublic: true,
      projectId: charlieProject1.id,
      userId: user3.id,
    },
  });

  // Create some private entries
  await prisma.entry.create({
    data: {
      title: 'Private Notes - Authentication Flow',
      content: `# Authentication Implementation Notes

## TODO
- [ ] Implement password reset functionality
- [ ] Add email verification
- [ ] Set up 2FA
- [ ] Add OAuth providers (Google, GitHub)

## Security Considerations
- Use bcrypt with salt rounds >= 10
- Implement rate limiting on login attempts
- Store JWT tokens securely
- Use httpOnly cookies for session management`,
      type: 'MARKDOWN',
      isPublic: false,
      projectId: aliceProject2.id,
      userId: user1.id,
    },
  });

    // Create some private entries
  await prisma.entry.create({
    data: {
      title: 'Private Notes - Authentication Flow',
      content: `# Authentication Implementation Notes

## TODO
- [ ] Implement password reset functionality
- [ ] Add email verification
- [ ] Set up 2FA
- [ ] Add OAuth providers (Google, GitHub)

## Security Considerations
- Use bcrypt with salt rounds >= 10
- Implement rate limiting on login attempts
- Store JWT tokens securely
- Use httpOnly cookies for session management`,
      type: 'MARKDOWN',
      isPublic: false,
      projectId: pappyProject22.id,
      userId: user22.id,
    },
  });

  await prisma.entry.create({
    data: {
      title: 'Database Migration Script (Private)',
      content: `-- Private migration script
-- DO NOT SHARE

ALTER TABLE users ADD COLUMN last_login TIMESTAMP;
ALTER TABLE users ADD COLUMN login_attempts INTEGER DEFAULT 0;

CREATE INDEX idx_users_last_login ON users(last_login);`,
      type: 'CODE',
      language: 'sql',
      isPublic: false,
      projectId: bobProject1.id,
      userId: user2.id,
    },
  });

  console.log('✅ Created 8 demo entries (6 public, 2 private)');
  console.log('\n📊 Seed Summary:');
  console.log('   Users: 3');
  console.log('   - alice@example.com (password: password123)');
  console.log('   - bob@example.com (password: password123)');
  console.log('   - charlie@example.com (password: password123)');
  console.log('   Projects: 4');
  console.log('   Entries: 8 (6 public, 2 private)');
  console.log('\n✨ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
