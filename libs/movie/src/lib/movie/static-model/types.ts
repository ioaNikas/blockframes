import models from './staticModels';

export const GENRESLABEL = models['GENRES'].map(key => key.label);
export const GENRESSLUG = models['GENRES'].map(key => key.slug);

export type GenresLabel = typeof GENRESLABEL[number];
export type GenresSlug = typeof GENRESSLUG[number];

export const STAKEHOLDERROLESLABEL = models['STAKEHOLDER_ROLES'].map(key => key.label);
export const STAKEHOLDERROLESSLUG = models['STAKEHOLDER_ROLES'].map(key => key.slug);

export type StakeholderRolesLabel = typeof STAKEHOLDERROLESLABEL[number];
export type StakeholderRolesSlug = typeof STAKEHOLDERROLESSLUG[number];

export const STAKEHOLDERDELIVERYAUTHORIZATIONSLABEL = models[
  'STAKEHOLDER_DELIVERY_AUTHORIZATIONS'
].map(key => key.label);
export const STAKEHOLDERDELIVERYAUTHORIZATIONSSLUG = models[
  'STAKEHOLDER_DELIVERY_AUTHORIZATIONS'
].map(key => key.slug);

export type StakeholderDeliveryAuthorizationsLabel = typeof STAKEHOLDERDELIVERYAUTHORIZATIONSLABEL[number];
export type StakeholderDeliveryAuthorizationsSlug = typeof STAKEHOLDERDELIVERYAUTHORIZATIONSSLUG[number];

export const CREDITROLESLABEL = models['CREDIT_ROLES'].map(key => key.label);
export const CREDITROLESSLUG = models['CREDIT_ROLES'].map(key => key.slug);

export type CreditRolesLabel = typeof CREDITROLESLABEL[number];
export type CreditRolesSlug = typeof CREDITROLESSLUG[number];

export const MOVIESTATUSLABEL = models['MOVIE_STATUS'].map(key => key.label);
export const MOVIESTATUSSLUG = models['MOVIE_STATUS'].map(key => key.slug);

export type MovieStatusLabel = typeof MOVIESTATUSLABEL[number];
export type MovieStatusSlug = typeof MOVIESTATUSSLUG[number];

export const LANGUAGESLABEL = models['LANGUAGES'].map(key => key.label);
export const LANGUAGESSLUG = models['LANGUAGES'].map(key => key.slug);

export type LanguagesLabel = typeof LANGUAGESLABEL[number];
export type LanguagesSlug = typeof LANGUAGESSLUG[number];

export const MOVIECURRENCIESLABEL = models['MOVIE_CURRENCIES'].map(key => key.label);
export const MOVIECURRENCIESSLUG = models['MOVIE_CURRENCIES'].map(key => key.slug);
export const MOVIECURRENCIESCODE = models['MOVIE_CURRENCIES'].map(key => key.code);

export type MovieCurrenciesLabel = typeof MOVIECURRENCIESLABEL[number];
export type MovieCurrenciesSlug = typeof MOVIECURRENCIESSLUG[number];
export type MovieCurrenciesCode = typeof MOVIECURRENCIESCODE[number];

export const SELECTIONCATEGORIESLABEL = models['SELECTION_CATEGORIES'].map(key => key.label);
export const SELECTIONCATEGORIESSLUG = models['SELECTION_CATEGORIES'].map(key => key.slug);

export type SelectionCategoriesLabel = typeof SELECTIONCATEGORIESLABEL[number];
export type SelectionCategoriesSlug = typeof SELECTIONCATEGORIESSLUG[number];

export const SCORINGLABEL = models['SCORING'].map(key => key.label);
export const SCORINGSLUG = models['SCORING'].map(key => key.slug);

export type ScoringLabel = typeof SCORINGLABEL[number];
export type ScoringSlug = typeof SCORINGSLUG[number];

export const COLORSLABEL = models['COLORS'].map(key => key.label);
export const COLORSSLUG = models['COLORS'].map(key => key.slug);

export type ColorsLabel = typeof COLORSLABEL[number];
export type ColorsSlug = typeof COLORSSLUG[number];

export const CERTIFICATIONSLABEL = models['CERTIFICATIONS'].map(key => key.label);
export const CERTIFICATIONSSLUG = models['CERTIFICATIONS'].map(key => key.slug);

export type CertificationsLabel = typeof CERTIFICATIONSLABEL[number];
export type CertificationsSlug = typeof CERTIFICATIONSSLUG[number];

export const TERRITORIESLABEL = models['TERRITORIES'].map(key => key.label);
export const TERRITORIESSLUG = models['TERRITORIES'].map(key => key.slug);

export type TerritoriesLabel = typeof TERRITORIESLABEL[number];
export type TerritoriesSlug = typeof TERRITORIESSLUG[number];

export const MEDIASLABEL = models['MEDIAS'].map(key => key.label);
export const MEDIASSLUG = models['MEDIAS'].map(key => key.slug);

export type MediasLabel = typeof MEDIASLABEL[number];
export type MediasSlug = typeof MEDIASSLUG[number];