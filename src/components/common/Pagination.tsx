"use client";

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import PaginationProps from '@customTypes/PaginationProps';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

const Pagination: FC<PaginationProps> = ({
	hasNextPage,
	hasPrevPage,
	url,
	pageCount
}
) => {
  	const router = useRouter()
  	const searchParams = useSearchParams()
	const page = searchParams.get('page') ?? '1'
	
	const nextPage = `/${url}/?page=${Number(page) + 1}`;
	const nextClass = hasNextPage ? '' : 'disabled';
	
	const prevPage = `/${url}/?page=${Number(page) - 1}`;
	const prevClass = hasPrevPage ? '' : 'disabled';


  	return (
		<div className='pagination'>
			<Link className={nextClass} href={prevPage}><FontAwesomeIcon icon={faBackward} /></Link>		
      		<div>
        		{page} / {Number(pageCount)}
      		</div>
			<Link className={nextClass} href={nextPage}><FontAwesomeIcon icon={faForward} /></Link>
    	</div>
  	)
}

export default Pagination