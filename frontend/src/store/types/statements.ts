export interface IStatement {
    id?: number
    created_at: string
    link: string
    statementmember_set: IStatementMember[]
    event: number
}

export interface IStatementMember {
    member: number
    attestation: boolean
    seminar: boolean
}

export interface IDownloadStatement {
    id: number
    fio: string
    created_at: string
    link: string
    type: string
}

export interface IStatementGroup {
    statementmember_set: IStatementMember[]
    event: number
}
