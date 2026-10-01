'use client';

import React, { useState } from 'react';
import { Code } from 'lucide-react';

interface TechLogoProps {
  name?: string;
  slug?: string;
  size?: number;
}

// Slugs that map to specific icon files in /icons/
const SLUG_MAP: Record<string, string> = {
  // Roles
  'frontend-essentials': 'role-frontend.svg',
  'frontend': 'role-frontend.svg',
  'backend-essentials': 'role-backend.svg',
  'backend': 'role-backend.svg',
  'mobile-essentials': 'role-mobile.svg',
  'mobile': 'role-mobile.svg',
  'devops-essentials': 'role-devops.svg',
  'devops': 'role-devops.svg',
  'database-essentials': 'role-database.svg',
  'database': 'role-database.svg',
  'role-frontend': 'role-frontend.svg',
  'role-backend': 'role-backend.svg',
  'role-mobile': 'role-mobile.svg',
  'role-devops': 'role-devops.svg',
  'role-ai': 'role-ai.svg',
  'role-database': 'role-database.svg',
  'role-data-engineer': 'role-data-engineer.svg',
  'role-business-analyst': 'role-business-analyst.svg',
  'role-product-manager': 'role-product-manager.svg',
  'business-analyst': 'business-analyst.svg',
  'data-engineering': 'data-engineering.svg',
  'product-management': 'product-management.svg',

  // Frontend
  'html': 'html.svg',
  'css': 'css.svg',
  'javascript': 'javascript.svg',
  'js': 'javascript.svg',
  'typescript': 'typescript.svg',
  'ts': 'typescript.svg',
  'react': 'react.svg',
  'nextjs': 'nextjs.svg',
  'next.js': 'nextjs.svg',
  'vuejs': 'vuejs.svg',
  'vue.js': 'vuejs.svg',
  'angular': 'angular.svg',
  'state-management': 'state-management.svg',
  'micro-frontend': 'micro-frontend.svg',
  'performance': 'performance.svg',
  'build-tools': 'build-tools.svg',
  'seo': 'seo.svg',

  // Backend
  'nodejs': 'nodejs.svg',
  'node.js': 'nodejs.svg',
  'nestjs': 'nestjs.svg',
  'python': 'python.svg',
  'fastapi': 'fastapi.svg',
  'django': 'django.svg',
  'golang': 'golang.svg',
  'go': 'golang.svg',
  'java': 'java.svg',
  'spring-boot': 'spring-boot.svg',
  'spring-spring-boot': 'spring-boot.svg',
  'csharp': 'csharp.svg',
  'c#': 'csharp.svg',
  'dotnet': 'csharp.svg',
  '.net': 'csharp.svg',
  'aspnet': 'csharp.svg',
  'cpp': 'cpp.svg',
  'c++': 'cpp.svg',
  'php': 'php.svg',
  'laravel': 'laravel.svg',
  'ruby': 'ruby.svg',
  'rails': 'rails.svg',
  'backend-api': 'backend-api.svg',

  // Mobile
  'flutter': 'flutter.svg',
  'android': 'android.svg',
  'react-native': 'react-native.svg',

  // Database
  'postgresql': 'postgresql.svg',
  'mongodb': 'mongodb.svg',
  'redis': 'redis.svg',
  'database-design': 'database.svg',
  'sql-nhp-mn': 'postgresql.svg',
  'caching': 'redis.svg',
  'nosql': 'mongodb.svg',
  'elasticsearch': 'elasticsearch.svg',

  // DevOps & Cloud
  'docker': 'docker.svg',
  'kubernetes': 'kubernetes.svg',
  'docker-kubernetes': 'docker-kubernetes.svg',
  'aws-cloud': 'aws-cloud.svg',
  'cicd': 'cicd.svg',
  'terraform-iac': 'cicd.svg',
  'git': 'git.svg',
  'security': 'security.svg',
  'network': 'network.svg',
  'os': 'os.svg',
  'operating-system': 'os.svg',
  'system-design': 'system-design.svg',
  'kafka': 'kafka.svg',
  'rabbitmq': 'rabbitmq.svg',
  'graphql': 'graphql.svg',

  // AI & Data
  'ai-engineering': 'ai-engineering.svg',
  'machine-learning': 'machine-learning.svg',
  'deep-learning': 'ai-engineering.svg',
  'reinforcement-learning': 'ai-engineering.svg',
  'data-science': 'machine-learning.svg',
  'statistics': 'data-engineering.svg',

  // Skills & Other
  'career': 'career.svg',
  'career-non-tech': 'career.svg',
  'dsa': 'dsa.svg',
  'testing': 'testing.svg',
  'code-quality': 'testing.svg',
  'coding-interview': 'coding.svg',
  'problem-solving': 'coding.svg',
  'trade-offs': 'system-design.svg',
  'tt-c-cu-hi': 'career.svg',

  // Catch-all / special
  'all': null,
  'english-interview': 'coding.svg',
  'ios-swift': 'mobile.svg',
  'android-kotlin': 'android.svg'
};

export default function TechLogo({ name = '', slug = '', size = 18 }: TechLogoProps) {
  const [hasError, setHasError] = useState(false);

  // Normalize key
  const cleanSlug = (slug || '').toLowerCase().trim();
  const cleanName = (name || '').toLowerCase().trim();
  const normalizedName = cleanName.replace(/[^a-z0-9#-]/g, '-');

  // Explicitly mapped to null → use fallback icon, don't try to fetch
  const hasMapping = Object.prototype.hasOwnProperty.call(SLUG_MAP, cleanSlug) ||
                     Object.prototype.hasOwnProperty.call(SLUG_MAP, cleanName) ||
                     Object.prototype.hasOwnProperty.call(SLUG_MAP, normalizedName);

  const iconFile =
    SLUG_MAP[cleanSlug] ??
    SLUG_MAP[cleanName] ??
    SLUG_MAP[normalizedName] ??
    (hasMapping ? null : cleanSlug ? `${cleanSlug}.svg` : null);

  if (!hasError && iconFile) {
    return (
      <img
        src={`/icons/${iconFile}`}
        alt={name || slug || 'icon'}
        width={size}
        height={size}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: 'contain',
          display: 'inline-block',
          verticalAlign: 'middle',
          flexShrink: 0
        }}
        onError={() => setHasError(true)}
      />
    );
  }

  return <Code size={size} color="var(--ink-secondary)" style={{ flexShrink: 0 }} />;
}
