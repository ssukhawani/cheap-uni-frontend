import React from "react";

function MembershipList({ list }) {

  const status = {
    'Active': 'Active ✅',
    'Inactive': 'Inactive 🔵',
    'Expired': 'Expired ❌'
  }
  return (
    <ul className="md:pl-8">
      {list.map((membership) => (
        <li
          key={membership.id}
          className="mb-4 p-4 bg-white rounded-lg shadow-md"
        >
          <p className="">
            Membership ID:{" "}
            <span className="pl-2 text-purple-500 font-semibold">
              {membership.id}
            </span>
          </p>
          <p>
            Plan Name:
            <span className="pl-2 text-purple-500 font-semibold">
              {membership.plan.name} ({membership.plan.duration_months} Months )
            </span>
          </p>
          <p>
            Start Date:{" "}
            <span className="pl-2 text-purple-500 font-semibold">
              {membership.start_date}
            </span>
          </p>
          <p>
            End Date:{" "}
            <span className="pl-2 text-purple-500 font-semibold">
              {membership.end_date}
            </span>
          </p>
          <p>
            Status:{" "}
            <span className="pl-2 text-purple-500 font-semibold">
              {status[membership.membership_status]}
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
}

const UserProfile = ({ user }) => {
  const activeMemberships = user.memberships.filter(
    (membership) => membership.membership_status === "Active" || membership.membership_status === "Inactive"
  );


    
  const expiredMemberships = user.memberships.filter(
    (membership) => membership.membership_status === "Expired"
  );

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">User Profile</h1>

      <p className="mb-2">
        Username:
        <span className="pl-3 text-purple-500 font-semibold">
          {user.username}
        </span>
      </p>

      <p className="mb-2">
        Email:
        <span className="pl-3 text-purple-500 font-semibold">{user.email}</span>
      </p>

      <h2 className="text-lg font-semibold my-6">Membership details</h2>

      <div className="md:pl-8 mb-6">
        <h3 className="text-md font-semibold mb-2">Active Memberships</h3>
        {activeMemberships.length > 0 ? (
          <MembershipList list={activeMemberships}></MembershipList>
        ) : (
          <p className="md:pl-8">No active memberships found</p>
        )}
      </div>

      <div className="md:pl-8">
        <h3 className="text-md font-semibold mb-2">Expired Memberships</h3>
        {expiredMemberships.length > 0 ? (
          <MembershipList list={expiredMemberships}></MembershipList>
        ) : (
          <p className="md:pl-8">No expired memberships found</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
