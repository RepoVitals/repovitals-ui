declare global {
  type Repositories = {
    id: number;
    owner: string;
    full_name: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    health_score: number;
    security: number;
    maintenance: number;
    popularity: number;
    category: string;
    license: string;
    updated_at: string;
    badges: string[];
    hasFullData: boolean;
    scorecard: null | ScoreCard;
    criticality: null | Criticality;
  };

  type ApiRes = {
    success: boolean;
    data: Repositories;
    message?: string;
  };

  type Criticality = {
    score: number;
    commit_frequency: number;
    recent_release_count: number;
    updated_issues_count: number;
    issue_comment_frequency: number;
    github_mention_count: number;
    last_scanned: string;
  };

  type ScoreCard = {
    score: number;
    version: string;
    last_scanned: string;
    checks: {
      name: string;
      score: number;
      reason: string;
      details?: string[];
      doc_url: string;
    }[];
  };

  type RepoReport = {
    id: number;
    uuid: string;
    full_name: string;
    owner: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
    language: string;
    last_synced_at: string;
    archived: boolean;
    fork: boolean;
    pushed_at: string;
    size: number;
    open_issues_count: number;
    subscribers_count: number;
    default_branch: string;
    etag: string;
    topics: string[];
    latest_commit_sha: string;
    homepage: string;
    has_issues: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    mirror_url: string;
    source_name: string;
    license: string;
    status: string;
    scm: string;
    pull_requests_enabled: boolean;
    icon_url: string;
    Metadata: {
      Files: {
        readme: string;
        changelog: string;
        contributing: string;
        funding: string;
        license: string;
        code_of_conduct: string;
        threat_model: string;
        audit: string;
        citation: string;
        codeowners: string;
        security: string;
        support: string;
        governance: string;
        roadmap: string;
        authors: string;
      };
    };
    created_at: string;
    updated_at: string;
    dependencies_parsed_at: string;
    dependency_job_id: string;
    CommitStats: {
      total_commits: number;
      total_committers: number;
      mean_commits: number;
      dds: number;
      last_synced_commit: string;
    };
    previous_names: string[];
    tags_count: number;
    template: boolean;
    template_full_name: string;
    purl: string;
    repository_url: string;
    tags_url: string;
    releases_url: string;
    manifests_url: string;
    owner_url: string;
    download_url: string;
    sbom_url: string;
    host: {
      name: string;
      url: string;
      kind: string;
      repositories_count: number;
      owners_count: number;
      icon_url: string;
      version: string;
      created_at: string;
      updated_at: string;
      host_url: string;
      repositories_url: string;
      repository_names_url: string;
      owners_url: string;
    };
    health_score: number;
    scorecard: ScoreCard;
    criticality: Criticality | null;
  };
}

export {};
