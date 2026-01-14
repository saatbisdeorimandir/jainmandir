'use client';

import { TrustMember, SiteConfig, Lang } from '@/lib/types';
import { getTrans, getBilingualAuth } from '@/lib/utils';

interface TrustCommitteeProps {
    siteConfig: SiteConfig;
    dict: any;
}

export function TrustCommittee({ siteConfig, dict }: TrustCommitteeProps) {
    if (!siteConfig.trust || !siteConfig.trust.committee) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {siteConfig.trust.committee.map((member, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-1 w-jain-orange bg-jain-orange mb-4 rounded-full" />
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                        {getTrans(dict, member.nameKey)}
                    </h3>
                    <p className="text-xl text-jain-orange font-semibold">
                        {getTrans(dict, member.roleKey)}
                    </p>
                </div>
            ))}
        </div>
    );
}

interface TrustTableProps {
    members: TrustMember[];
    lang: Lang;
    dict: any;
}

export function TrustTable({ members, lang, dict }: TrustTableProps) {
    return (
        <div className="bg-white shadow overflow-hidden rounded-xl overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-white">
                    <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-jain-orange uppercase tracking-wider">
                            {getTrans(dict, 'trust.table.no')}
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-jain-orange uppercase tracking-wider">
                            {getTrans(dict, 'trust.table.name')}
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-jain-orange uppercase tracking-wider">
                            {getTrans(dict, 'trust.table.place')}
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {members.map((member) => (
                        <tr key={member.no} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.no}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                                {getBilingualAuth(member.name, lang)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {getBilingualAuth(member.place, lang)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
