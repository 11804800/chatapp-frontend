import { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import BlockedUsersComponent from './BlockedUsersComponent';
import PermissionSetting from './PermissionSetting';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function PrivacyComponent({ setPrivacyPageActive }: any) {

    useGSAP(() => {
        gsap.from(".privacy-container", {
            x: 100,
            duration: .2
        })
    });
    const [BlockedContact, setBlockedContact] = useState(false);
    const [Permissions, SetPermission] = useState("");


    function ClosePrivacyPage() {
        gsap.to(".privacy-container", {
              opacity:0,
            x: 200,
            duration: .2,
            onComplete: () => {
                setPrivacyPageActive(false)
            }
        })
    }

    if (BlockedContact) {
        return (
            <BlockedUsersComponent setBlockedContact={setBlockedContact} />
        )
    }
    else if (Permissions != "") {
        return (
            <PermissionSetting Permissions={Permissions} SetPermission={SetPermission} />
        )
    }
    else {
        return (
            <div className='overflow-hidden privacy-container w-full h-full absolute top-0 left-0 bg-white p-2 flex flex-col gap-8'>
                <div className='flex items-center gap-4'>
                    <button onClick={ClosePrivacyPage}>
                        <BiArrowBack size={24} />
                    </button>
                    <h1 className='text-xl font-medium'>Privacy</h1>
                </div>
                <div className='p-2 flex flex-col'>
                    <p className='font-medium text-zinc-500 pb-8'>Who can see my personal info</p>
                    <div onClick={() => SetPermission("Last Seen and Online")} className='border-b-[1px] border-zinc-300 py-4 px-2 '>
                        <p>Last Seen and Online</p>
                        <p className='text-sm text-zinc-500'>My Contacts</p>
                    </div>
                    <div onClick={() => SetPermission("Profile Photo")} className='border-b-[1px] border-zinc-300 px-2 py-4 '>
                        <p>Profile Photo</p>
                        <p className='text-sm text-zinc-500'>Everyone</p>
                    </div>
                    <div onClick={() => SetPermission("About")} className='border-b-[1px] border-zinc-300 px-2 py-4 '>
                        <p> About</p>
                        <p className='text-sm text-zinc-500'>My Contacts</p>
                    </div>
                    <div onClick={() => { SetPermission("Status") }} className='border-b-[1px] border-zinc-300 px-2 py-4 '>
                        <p>
                            Status
                        </p>
                        <p className='text-sm text-zinc-500'>
                            My Contacts
                        </p>
                    </div>
                    <div className='px-2 py-2' onClick={() => setBlockedContact(true)}>
                        <p>Blocked Contacts</p>
                        <p className='text-sm text-zinc-500'>1</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default PrivacyComponent