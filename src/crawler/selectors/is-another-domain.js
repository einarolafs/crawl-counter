const isAnotherDomain = (link, domain) => link.startsWith('http') && !link.includes(domain)

export default isAnotherDomain
